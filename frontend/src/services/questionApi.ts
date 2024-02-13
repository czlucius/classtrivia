import {Question} from "../Question.ts";
import {JSON_HEADERS} from "./utils.ts";

export async function saveQuiz(q:  {[id: string]: Question}, title: string, description: string) {
    // await fetch()
    // Upload the image first

    const questions = {...q}

    const qnList = []
    for (const questionId in questions) {
        const question: Question = {...questions[questionId]}
        if (question.image) {
            const imageResponse = await fetch(question.image)
            const imageBlob = await imageResponse.blob()

            const response = await fetch("/api/storage/upload", {
                headers: {
                    "X-File-Name": `quizImages/${question.id}`
                }, body: imageBlob,
                method: "PUT"
            })
            const formatted = await response.json()
            if (response.ok && !formatted.error) {
                question.image = formatted.url
            }

        }
        qnList.push(question)

    }

    const reqBody = {
        title, description, questions: qnList
    }
    await fetch("/api/quiz/create-quiz", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: JSON_HEADERS
    })

}
