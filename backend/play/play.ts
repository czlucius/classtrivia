import express from "express"
import {Server} from "socket.io"


import Quiz from "../data/quiz.mjs"
import jwt from 'jsonwebtoken'
import User from "../data/users.mjs"
import {Session} from "./session.ts"
import {generateCode} from "../utils.ts"
import * as socketio from "socket.io";
import bodyParser from "body-parser";

// let sessions: {
//     [sessionId: string]: Session
// } = {}
export const playRouter = express.Router()
export default {
    playRouter: playRouter
}
async function generateUnique6Code() {
    let code: string
    do {
        code = generateCode(6)
    } while (await Session.findById(code))
    return code
}
playRouter.use(bodyParser.json())
playRouter.post("/createRoom", async (req, res) => {
    const {
        quizId
    } = req.body
    console.log(req.body)
    const cookies = req.cookies
    const token = cookies["ClassTrivia-Token"]
    const tokenObj = await jwt.verify(token, process.env.JWT_TOKEN)
    if (!tokenObj) {
        return res.status(403).json({
            error: true,
            errorMsg: "Authentication failure",
            errorSR: "no_auth"
        })
    }

    const user = await User.findById(tokenObj.id)
    if (!user.isTeacher) {
        return res.status(400).json({
            error: true,
            errorMsg: "Students cannot create quizzes!",
            errorSR: "student_no_create"
        })
    }


    const quiz = await Quiz.findById(quizId)
    console.log(quizId, "quiz is", quiz)
    if (!quiz) {
        // no quiz with this id.
        return res.status(404).json({
            error: true,
            errorMsg: "Quiz not found",
            errorSR: "quiz_invalid"
        })
    }

    const code = await generateUnique6Code()
    const session = new Session({
        quiz: quiz._id,
        owner: user._id,
        users: [],
        _id: code
    })

    await session.save()

    return res.json({
        error: false,
        success: true,
        session: session._id,
        code
    })

})
//
//
// play.post("/join/:id", async (req, res) => {
//     const sessionId = req.params.id
//     const token = req.cookies["ClassTrivia-Token"]
//     const tokenObj = await jwt.verify(token, process.env.JWT_TOKEN)
//     if (!tokenObj) {
//         return res.status(403).json({
//             error: true,
//             errorMsg: "Authentication failure",
//             errorSR: "no_auth"
//         })
//     }
//
//
//     const user = await User.findById(tokenObj.id)
//     if (!user) {
//         // how does one get into this condition?
//         // but good to check
//         // because all JWTs are signed by the server, and the server only creates them for valid users
//         return res.status(400).json({
//             error: true,
//             errorMsg: "Invalid user!",
//             errorSR: "student_no_create"
//         })
//     }
//
//
//     const session = await Session.findById(sessionId)
//     if (!session) {
//         // no quiz with this id.
//         return res.status(404).json({
//             error: true,
//             errorMsg: "Session not found",
//             errorSR: "session_invalid"
//         })
//     }
//     session.users.push(user._id)
//     await session.save()
//     return res.json({
//         error: false,
//         success: true
//     })
// })



//
// play.post("/start", async (req, res) => {
//     const {
//         quizId
//     } = req.body
//     const cookies = req.cookies
//     const token = cookies["ClassTrivia-Token"]
//     const tokenObj = await jwt.verify(token, process.env.JWT_TOKEN)
//     if (!tokenObj) {
//         return res.status(403).json({
//             error: true,
//             errorMsg: "Authentication failure",
//             errorSR: "no_auth"
//         })
//     }
//
//     const user = await User.findById(tokenObj.id)
//     if (!user.isTeacher) {
//         return res.status(400).json({
//             error: true,
//             errorMsg: "Students cannot create quizzes!",
//             errorSR: "student_no_create"
//         })
//     }
//
//
//     const quiz = await Quiz.findById(quizId)
//     if (!quiz) {
//         // no quiz with this id.
//         return res.status(404).json({
//             error: true,
//             errorMsg: "Quiz not found",
//             errorSR: "quiz_invalid"
//         })
//     }
//
//     const code = generateUnique6Code()
//     const session = new Session({
//         quiz: quiz._id,
//         owner: user._id,
//         users: [],
//         _id: code
//     })
//
//     await session.save()
//
//     return res.json({
//         error: false,
//         success: true,
//         code
//     })
//
// })
//

