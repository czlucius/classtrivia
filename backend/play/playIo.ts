
// Socket endpoints for managers
import User from "../data/users.mjs";
import {Session} from "./session.ts";
import jwt from "jsonwebtoken"
import {socketAuthManageRole} from "../io/socket.ts";
import {Question} from "./Question.ts";
import socketio from "socket.io"

// https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
// Warn if overriding existing method
if(Array.prototype["equals"])
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype["equals"] = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;
    // if the argument is the same array, we can be sure the contents are same as well
    if(array === this)
        return true;
    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

export const onIo = (io: socketio.Server) => {

    io.on("connection", socket => {
        socket.emit("hello", {
            message: "world"
        })
    })
    io.of("/api/manage")
        .use(async (socket, next) => {
            console.log("manage")
            return await socketAuthManageRole(socket, next)
        })
        .on("connection", socket => {
            console.log(socket.data)
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
            if (!token) {
                console.log("User attempted to connect without a token!")
                return socket.disconnect()
            }
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
                // console.log(session)
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
                await Session.updateOne({_id: id}, {$set: {
                    [`results.${user._id}`]: {
                        "user": user._id,
                        "answers": [],
                        "points": 0
                    }
                    }})

                // console.log("resp", response, response.users)
                socket.join(id)
                socket.join(user._id)
                console.log("User has joined these rooms:", id, user._id)
                const usersResponse = await Session.findById(id).select("users").populate("users", ["username", "profilePicUrl"])
                io.of("/api/play").to(id).emit("users", usersResponse.users)
                io.of("/api/manage").to(id).emit("users", usersResponse.users)
                return callback({
                    error: false,
                    success: true
                })
            })

            socket.on("getMyResults", async (id, callback) => {
                const session = await Session.findById(id).select("results")

                console.log("Session", session)
                if (!session) {
                    // no quiz with this id.
                    return callback({
                        error: true,
                        errorMsg: "Session not found",
                        errorSR: "session_invalid"
                    })
                }
            })
            socket.on("submitAnswer", async (id, answer, callback) => {
                console.log("Answer submitted", id, answer)
                const session = await Session.findById(id).populate("quiz")
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
                const question: Question = session.quiz.questions[round]
                const correctAns = question.correct
                console.log(`User ${user.username} submitted`, answer, "Correct answers are", correctAns)
                let correct = false

                switch (question.typ) {
                    case "MCQ":
                    case "True/False":
                    case "Open-Ended":
                        l1:
                        for (const ans of correctAns) {
                            if (answer === ans) {
                                correct = true
                                break l1
                            }
                        }
                        break
                    case "MSQ":
                        correct = correctAns["equals"]?.(answer) ?? false
                        console.log("MSQ", correctAns, answer, correct)

                        break
                }

                session.results ??= new Map()
                let mySessionUser = (session.results).get(user._id)
                mySessionUser ??= {
                    answers: []
                }
                const myCurrentAnswer = {
                    questionId: question.id,
                    mine: JSON.stringify(answer),
                    correct,
                    modelAns: correctAns
                }
                mySessionUser.answers.push(myCurrentAnswer)
                io.of("/api/manage").to(id).emit("increment", user._id)

                if (correct) {
                    mySessionUser.points ??= 0
                    console.log("adding to points", mySessionUser.points, question.score, question)
                    mySessionUser.points += (question.score ?? 0)
                }
                session.results.set(user._id, mySessionUser)

                console.log("session is now", session)
                await session.save()

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
