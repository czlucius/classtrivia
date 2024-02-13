
// Socket endpoints for managers
import User from "../data/users.mjs";
import {Session} from "./session.ts";
import jwt from "jsonwebtoken"
export const onIo = io => {

    io.on("connection", socket => {
        socket.emit("hello", {
            message: "world"
        })
    })
    io.of("/api/manage")
        .use(async (socket, next) => {
            console.log("manage")
            const token = socket.handshake.auth.token || socket.handshake.headers?.token;
            const isValid = await jwt.verify(token, process.env.JWT_TOKEN)
            if (isValid) {

                const user = await User.findById(isValid.id)
                // console.log("user", user)
                if (!user) {
                    console.log("Invalid user!")
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
                if (!user.isTeacher) {
                    console.log("Students cannot manage", user)
                    socket.disconnect()
                }
                socket.data = {
                    user: user
                }
                next();
            }
            else {
                const err = new Error("unauthorized");
                next(err);
            }
        })
        .on("connection", socket => {
            const user = socket.data.user


            socket.on("joinSession", async (id, callback) => {
                console.log("manage join")
                const session = await Session.findOne({_id: id}).select(["_id", "owner"])
                console.log(session)
                if (!session) {
                    // no quiz with this id.
                    console.log("no id found")
                    return callback({
                        error: true,
                        errorMsg: "Session not found",
                        errorSR: "session_invalid"
                    })
                    // return res.status(404).json()
                }
                console.log("own", session.owner, user._id)

                if (session.owner !== user._id) {
                    return callback({
                        error: true,
                        errorMsg: "Unauthorized: you do not own this quiz.",
                        errorSR: "unauth_no_own"
                    })
                }
                socket.join(id)
            })
        })




    io.of("/api/game")
        .use(async (socket, next) => {
            console.log("/api/game")
            return await socketAuthManageRole(socket, next);
        })
        .on("connection", socket => {

        })

// Socket endpoints for users
// query of id is required
    io.of("/api/play")
        .use(async (socket, next) => {
            console.log("connecting...")

            const token = socket.handshake.auth?.token || socket.handshake.headers?.token
            const tokenObj = await jwt.verify(token, process.env.JWT_TOKEN)
            console.log("user has logged in", tokenObj)
            if (!tokenObj) {
                return next(new Error("Authentication failure"))
            }

            const user = await User.findById(tokenObj.id)
            // console.log("user", user)
            if (!user) {
                console.log("Invalid user!")
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
            next()

        })
        .on("connection", socket => {
            const user = socket.data.user
            console.log("Connected!")
            // console.log("User:", user)


            socket.on("manageSession", async (id, callback) => {

            })
            socket.on("joinSession", async (id, callback) => {
                console.log("joinSession", id, callback)
                const session = await Session.findOne({_id: id}).select("_id")
                console.log(session)
                if (!session) {
                    // no quiz with this id.
                    console.log("no id found")
                    return callback({
                        error: true,
                        errorMsg: "Session not found",
                        errorSR: "session_invalid"
                    })
                    // return res.status(404).json()
                }

                const response = await Session.updateOne({_id: id}, {$addToSet: {users: user._id}})

                console.log("resp", response, response.users)
                socket.join(id)
                const usersResponse = await Session.findById(id).select("users").populate("users", ["username", "profilePicUrl"])
                io.of("/api/play").to(id).emit("users", usersResponse.users)
                io.of("/api/manage").to(id).emit("users", usersResponse.users)
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
            socket.adapter.on("join-room", (room, id) => {
                console.log(`socket ${id} has joined room ${room}`);
            })
        })
}
