const dotenv = require("dotenv")
dotenv.config()

const mongoose = require('mongoose');
console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL, {
    dbName: "classTrivia"
})
const express = require("express")
const bodyParser = require("body-parser")
const {authRouter} = require("./auth/users")
const app = express()

app.use(bodyParser.json())




app.use("/api/auth", authRouter)

const PORT = 9109
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})