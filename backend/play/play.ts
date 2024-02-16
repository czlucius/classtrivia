import express from "express"
import {Server} from "socket.io"


import Quiz = require("../data/quiz")
import jwt = require("jsonwebtoken")
import User = require("../data/users.mjs")
import {Session} from "./session.ts"
import {generateCode} from "../utils.ts"
import * as socketio from "socket.io";

export const playIo = new socketio.Server()

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
    } while (!(await Session.findById(code)))
    return code
}

playRouter.post("/createRoom", async (req, res) => {
    const {
        quizId
    } = req.body
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
    if (!quiz) {
        // no quiz with this id.
        return res.status(404).json({
            error: true,
            errorMsg: "Quiz not found",
            errorSR: "quiz_invalid"
        })
    }

    const code = generateUnique6Code()
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

playIo.on("connection", (socket: { on: any }) => {
    socket.on("create")
})

// Socket endpoints for managers
playIo.of("/manage")
    .use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        const isValid = await jwt.verify(token, process.env.JWT_TOKEN)
        if (isValid) next();
        else {
            const err = new Error("unauthorized");
            next(err);
        }
    })
    .on("connection", socket => {

    })


// Socket endpoints for users
// query of id is required
playIo.of("/play")
    .use(async (socket, next) => {

        const token = socket.handshake.auth.token
        const tokenObj = await jwt.verify(token, process.env.JWT_TOKEN)
        if (!tokenObj) {
            return next(new Error("Authentication failure"))
        }

        const user = await User.findById(tokenObj.id)
        if (!user) {
            // how does one get into this condition?
            // but good to check
            // because all JWTs are signed by the server, and the server only creates them for valid users
            return next(new Error("Invalid user!"))
            // return callback( {
            //     error: true,
            //     errorMsg: "Invalid user!",
            //     errorSR: "student_no_create"
            // })
        }
        socket.data = {
            user: user
        }
    })
    .on("connection", socket => {
        const user = socket.data.user
        console.log("Connected!")
        console.log("User:", user)
        socket.on("joinSession", async (id, callback) => {

            const session = await Session.findById(id)
            if (!session) {
                // no quiz with this id.
                return callback({
                    error: true,
                    errorMsg: "Session not found",
                    errorSR: "session_invalid"
                })
                // return res.status(404).json()
            }


            session.users.push(user._id)
            await session.save()
            socket.join(id)
            socket.emit("users", session.users)
            return callback({
                error: false,
                success: true
            })
        })
        socket.on("submitAnswer", async (id, answer, callback) => {
            const session = await Session.findById(id).populate("Quiz")
            console.log("Session", session)
            if (!session) {
                // no quiz with this id.
                return callback({
                    error: true,
                    errorMsg: "Session not found",
                    errorSR: "session_invalid"
                })
                // return res.status(404).json()
            }

            const round = session.current
            // @ts-ignore Alr populated.
            const question = session.quiz.questions[round]
            const correctAns = question.correct
            console.log(`User ${user.username} submitted`, answer, "Correct answers are", correctAns)
            let correct = false
            for (const ans of correctAns) {
                if (answer === ans.description) {
                    correct = true
                    break
                }
            }

            const userEntry = session.results.find(predicate => predicate.user === user._id.toString())
            userEntry.answers.push(answer)
            userEntry.correct.push(answer)
            // EXPM Client side will receive if answer is correct, but only can reveal this after quiz ends.
            callback({
                correct
            })
        })
    })
