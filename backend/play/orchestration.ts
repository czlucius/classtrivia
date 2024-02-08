import express from "express"
import {Server} from "socket.io"
import {StrictEventEmitter} from "socket.io/dist/typed-events";
import Quiz = require( "../data/quiz");
import EventEmitter = require('node:events');
import {Question} from "./Question";
const orchestrate =   express.Router()
const eventHandler = new  EventEmitter();
import {Session} from "./session";
import {Sessions} from "./Sessions";
import {io} from "../index.mjs"
import {timeoutPromise} from "../utils";

eventHandler.on('startQuiz', async (id, questions: Question[]) => {
    let num = 0
    for (const question of questions) {
        await Session.findByIdAndUpdate(id, {$set: {
              current: num
            }
        })
        io.to(id).emit("question", question)
        const seconds = question.seconds
        await timeoutPromise(seconds * 1000);
        // React client would know to end submission by now
        const sessionResults = await Session.findById(id).select("results")
        const sessions = new Sessions(questions, sessionResults.results)
        // User will get their updated score
        const results = sessions.computeResult()
        // Client side MUST check any change in result, and use that to determine correctness in answer.
        const sessionQuiz = await Session.findById(id).select("quiz").populate("Quiz")
        // @ts-ignore
        io.to(id).emit("answers",  sessionQuiz.quiz.questions[num].correct)
        io.to(id).emit("qnEnd", results)
        num++
    }
})

orchestrate.post("/start", async (req, res) => {
    const {id} = req.body
    const session = await Session.findById(id).populate("Quiz")
    // const quiz
    // @ts-ignore TODO
    eventHandler.emit("startQuiz", id, session.quiz.questions)
    res.send(200).json({
        success: "Quiz starting"
    })
})