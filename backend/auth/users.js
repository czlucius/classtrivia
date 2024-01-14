const express = require("express")
const mongoose = require("mongoose")
const User = require("../data/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const authRouter = new express.Router()

// Note: these paths should be accessed via secure HTTPS and not insecure HTTP!
authRouter.post("/login", async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({ username })
    // Refer to `node_modules/bcryptjs/dist/bcrypt.js` for docs
    const passwordCorrect = user ? await bcrypt.compare(password, user.hashedPw) : false
    if (!passwordCorrect) {
        return res.json({
            error: true,
            errorMsg: "Username/password invalid!",
            errorSR: "un_pw_x"
        })
    }

    // Send the user the JWT
    const jwtToken = process.env.JWT_TOKEN
    const userObj = {
        username,
        userid: user.userid,
        id: user.id,
        issued: Date.now()
    }
    const token = await jwt.sign(userObj, jwtToken)
    return res.status(200).json({ token, error: false })
})

authRouter.post("/signup", async (req, res) => {
    const userDetailsRaw = req.body
    
})