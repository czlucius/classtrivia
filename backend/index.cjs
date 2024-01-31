const dotenv = require("dotenv")
dotenv.config()

const mongoose = require('mongoose');
console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL, {
    dbName: "classTrivia"
}).then(() => {
    console.log("Connected to MongoDB 🍃")
})
const express = require("express")
const bodyParser = require("body-parser")
const {authRouter} = require("./auth/users")
const app = express()
const http = require("node:http")
const {io} = require("./io/socket");
const httpServer = http.createServer(app)
//
// const {createClient} = require("redis")
// const redisClient = createClient({
//     url: "redis-14278.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:14278"
// })

const cookieParser = require("cookie-parser")
const playRouter = require("./play/play.mts")
// redisClient.on("connect", () => {
//     console.log("Connected to Redis!")
// })



app.use(bodyParser.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/play", playRouter)


io.on("connection", (socket) => {
    socket.emit("hello", {message: "Hello World!"})
})


const PORT = 9109
httpServer.listen(PORT, () => {
    console.log(`Listening on ${PORT} 🚀`)
})

module.exports = {httpServer}