import "dotenv/config"
import mongoose from 'mongoose';
console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL, {
    dbName: "classTrivia"
}).then(() => {
    console.log("Connected to MongoDB 🍃")
})
import express from 'express';
import bodyParser from 'body-parser';
const app = express()
import http from 'node:http';

export const httpServer = http.createServer(app)
import * as socketio from "socket.io";
serverIoConnect(httpServer)

import { authRouter } from './auth/users.mjs';

//
// const {createClient} = require("redis")
// const redisClient = createClient({
//     url: "redis-14278.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:14278"
// })
import cookieParser from 'cookie-parser';

import pr from "./play/play.ts";
import {storageRouter} from "./auth/storage.ts";
import quizRouter from "./quizcreation/quizController.js";
import {onOrchestrateIo, orchestrate} from "./play/orchestration.js";
import {io, serverIoConnect} from "./io/socket.js";
import {onIo} from "./play/playIo.js";

import leaderboardRouter from "./leaderboard/leaderboard.mjs";
import pointsHandler from "./leaderboard/pointsHandler.mjs";
import emailSender from "./leaderboard/emailsender.mjs";

// redisClient.on("connect", () => {
//     console.log("Connected to Redis!")
// })



app.use(bodyParser.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/play", pr.playRouter)
app.use("/api/storage", storageRouter)
app.use("/api/quiz", quizRouter)
app.use("/api/orchestration", orchestrate)
app.use("/api/pointshandler", pointsHandler)
app.use("/api/emailsender", emailSender)
app.use("/api/leaderboard", leaderboardRouter)

onIo(io)
onOrchestrateIo(io)
io.on("connection", socket => {
    console.log("ee")
    socket.emit("hello", {
        message: "world"
    })
    socket.on('hello', function () {
        console.log("test it") //Not Reached ):
        io.emit("world", 112)
    });
})

// io.on("connection", (socket) => {
//     socket.emit("hello", {message: "Hello World!"})
// })

const PORT = 9109
httpServer.listen(PORT, () => {
    console.log(`Listening on ${PORT} 🚀`)
})
