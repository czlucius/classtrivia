const dotenv = require("dotenv")
dotenv.config()

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