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
export const io = new socketio.Server(httpServer)


import { authRouter } from './auth/users.mjs';

//
// const {createClient} = require("redis")
// const redisClient = createClient({
//     url: "redis-14278.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:14278"
// })
import cookieParser from 'cookie-parser';

import pr, {playIo} from "./play/play.ts";
import {storageRouter} from "./auth/storage.ts";
import quizRouter from "./quizcreation/quizController.js";

// redisClient.on("connect", () => {
//     console.log("Connected to Redis!")
// })



app.use(bodyParser.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/play", pr.playRouter)
app.use("/api/storage", storageRouter)
app.use("/api/quiz", quizRouter)
io.use(playIo)

// io.on("connection", (socket) => {
//     socket.emit("hello", {message: "Hello World!"})
// })

const PORT = 9109
httpServer.listen(PORT, () => {
    console.log(`Listening on ${PORT} 🚀`)
})
