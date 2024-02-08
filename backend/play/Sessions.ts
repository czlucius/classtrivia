export class Sessions {
    private session: any;
    private questions: any;
    private results: any;
    constructor(questions, results) {
        this.questions = questions;
        this.results = results
    }

    /*
    _id: String,
    quiz: { type: String, ref: 'Quiz' },
    users: [{type: String, ref: 'User'}],
    owner: {type: String, ref: 'User'},
    results: [{
        user: {type: String, ref: 'User'},
        answers: [String]
    }]
     */

    /*
    {
    _id: String,
    questions: [{
        id: String,
        type: String,
        photo: String,
        correctAnswer: [{
            description: String,
            correct: Boolean
        }],
        value: Number,
        data: [],
        score: Number,
        seconds: Number
    }]
}
     */
    computeResult(): { results: Results, correct: { description: string }[] } {
        const userResponses = this.results
        const questions = this.questions
        const myResults: Results = {}

        let correct: { description: string }[]
        for (let i=0; i<userResponses.length; i++) {
            const userResponse = userResponses[i]
            myResults[userResponse.user] ??= 0
            for (let j=0; j<userResponse.answers.length; j++) {
                const answer = userResponse.answers[j];
                const question = questions[j]
                correct = question.correct
                console.log("Checking for correct answer", answer, correct)
                for (const correctAns of correct) {
                    if (answer === correctAns) {
                        console.log("Correct!")
                        myResults[userResponse.user] += question.score
                        break
                    }
                }

            }
        }
        return {
            results: myResults,
            correct
        }
    }
}

export interface Results {
    [userId: string]: number
}