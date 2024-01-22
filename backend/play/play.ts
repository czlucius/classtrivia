import express = require("express")
import {Server} from "socket.io"

const play = new express.Router()

import {io} from "../io/socket"
import {redisClient} from "../index"
import Quiz = require("../data/quiz")
import jwt = require("jsonwebtoken")
import User = require("../data/users")
import {Session} from "./session"
import {generateCode} from "../utils"

io.on("connection", (socket: { on: any }) => {
    socket.on("create")
})

// let sessions: {
//     [sessionId: string]: Session
// } = {}

async function generateUnique6Code() {
    let code: string
    do {
        code = generateCode(6)
    } while (!(await Session.findById(code)))
    return code
}

play.post("/createRoom", async (req, res) => {
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



io.of("/play")
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
        const token = socket.handshake.auth.token
        socket.on("join", async (id, callback) => {
            const sessionId = id
            const token = socket.handshake.auth.token
            const tokenObj = await jwt.verify(token, process.env.JWT_TOKEN)
            if (!tokenObj) {
                return callback( {
                    error: true,
                    errorMsg: "Authentication failure",
                    errorSR: "no_auth"
                })
            }



            const user = await User.findById(tokenObj.id)
            if (!user) {
                // how does one get into this condition?
                // but good to check
                // because all JWTs are signed by the server, and the server only creates them for valid users
                return callback( {
                    error: true,
                    errorMsg: "Invalid user!",
                    errorSR: "student_no_create"
                })
            }


            const session = await Session.findById(sessionId)
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
            return callback({
                error: false,
                success: true
            })
        })
    })
