import express from "express"
import {Server} from "socket.io"
import {StrictEventEmitter} from "socket.io/dist/typed-events";
import EventEmitter from 'node:events'
import {Question} from "./Question";
const orchestrate = express.Router()
const eventHandler = new  EventEmitter();
import {Session} from "./session.ts";
import {Results, Sessions} from "./Sessions.ts";
import {io} from "../io/socket.ts";
import {timeoutPromise} from "../utils.ts";
import bodyParser from "body-parser";
import {promisify} from "util";
import User from "../data/users.mjs";
orchestrate.use(bodyParser.json())
const resolvers = {

}

eventHandler.on('startQuiz', async (id, questions: Question[]) => {
    console.log("startQuiz")
    let num = 0
    for (let question of questions) {
        console.log(question)
        await Session.findByIdAndUpdate(id, {$set: {
              current: num
            }
        })

        io.of("/api/manage").to(id).emit("question", question)
        const redactedQn = {...question.toJSON(), correct: null}
        io.of("/api/play").to(id).emit("question", redactedQn)

        const seconds = question.seconds
        await timeoutPromise(seconds * 1000);
        console.log("quiz FINISH")
        io.of("/api/play").to(id).emit("qnEnd", true)
        // React client would know to end submission by now
        const sessionResults = await Session.findById(id).select("results")
        // const sessions = new Sessions(questions, sessionResults.results)
        // // User will get their updated score
        // const results = sessions.computeResult()
        // Client side MUST check any change in result, and use that to determine correctness in answer.
        const sessionQuiz = await Session.findById(id).select("quiz").populate("quiz")
        // io.of("/api/play").to(id).emit("qnEnd", sessionResults.results)
        console.log("here");


        (sessionResults.results as Map<string, any>)?.forEach((val, key) => {
            console.log("key", key)
            console.log("val", val)
            io.of("/api/play").to(key).emit("qnResult", val, question.id)
        })
        io.of("/api/manage").to(id).emit("qnoResult", sessionResults.results, question)


        io.of("/api/play").to(id).emit("answers",  sessionQuiz.quiz.questions[num].correct)
        io.of("/api/manage").to(id).emit("answers",  sessionQuiz.quiz.questions[num].correct)
        await new Promise<void>(resolve => {
            console.log("in promise")
            resolvers[id] ??= []
            resolvers[id].push(resolve)

        })
        console.log("resolved!")
        num++
    }

    console.log("quiz" ,id, "has finished!")
    await timeoutPromise(1000);
    const sessionResults = await Session.findById(id).select("results")
    io.of("/api/manage").to(id).emit("finish", sessionResults);
    (sessionResults.results as Map<string, any>)?.forEach((val, key) => {
        console.log("key", key)
        console.log("val", val)
        io.of("/api/play").to(key).emit("finish", val)
    })

    const a  = sessionResults.results
    getResultList(a)
    var now = new Date();
    var fullDaysSinceEpoch = Math.floor(now.getTime()/8.64e7);
    for (let i = 0; i < 3; i++) {
        const result = a[i]
        if (result !== undefined) {
            console.log("updating user points (top3)", result)
            await User.findByIdAndUpdate(result.user,{$addToSet: {
                points: fullDaysSinceEpoch
                }, $inc: { "pointsLength": 1 }  })
        }
    }
})

function getResultList(results: any) {
    // @ts-ignore
    return Object.values(results)
        .sort((a, b) => a.points - b.points)
}
export const onOrchestrateIo = (io) => {
    io.of("/api/manage").on("connection", socket => {
        socket.on("resume", (id) => {
            console.log("resume", resolvers)
            resolvers[id]?.forEach((elem, index) => {
                console.log(elem, index)
                elem()
            })
            resolvers[id] = []
        })
    })
}

orchestrate.post("/start", async (req, res) => {
    const {id} = req.body
    console.log("id is", id)
    const session = await Session.findOne({_id: id}).populate(["quiz", "users"])
    if (session?.users && session?.users?.length < 1) {
        return res.status(400).json({
            error: true,
            errorMsg: "No users in quiz!"
        })
    }
    io.of("/api/play").emit("quiz", session.id)
    res.status(200).json({
        error: false,
        success: "Quiz starting"
    })
    await timeoutPromise(3000)
    eventHandler.emit("startQuiz", id, session.quiz.questions)

})


export {orchestrate}