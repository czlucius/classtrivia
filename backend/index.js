const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())








const PORT = 4567
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})