const express = require("express")
const mongoose = require("mongoose")
const User = require("../data/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const bodyParser = require("body-parser")
const flash = require("connect-flash")
const expSession = require("express-session")
const crypto = require("crypto")
const {S3Interactor} = require("../data/storage");
const upload = multer()
const storage = new S3Interactor()


const authRouter = new express.Router()
authRouter.use(expSession({ cookie: { maxAge: 60000 }, secret: process.env.SESSION_SECRET}));
authRouter.use(flash())

// Note: these paths should be accessed via secure HTTPS and not insecure HTTP!
authRouter.post("/login", bodyParser.json(), async (req, res) => {
    const {email, password} = req.body
    console.log(req.body)
    const user = await User.findOne({ email })
    // Refer to `node_modules/bcryptjs/dist/bcrypt.js` for docs
    const passwordCorrect = user ? await bcrypt.compare(password, user.hashedPw) : false

    if (!passwordCorrect) {
        // console.log(req.headers.referer
        // )
        //
        //
        // const a = new URL(req.headers.referer)
        // a.searchParams.set("error", "1")
        // console.log(a, a.search)
        //
        // res.redirect(decodeURIComponent(a.toString()))

        return res.json({
            error: true,
            errorMsg: "Username/password invalid!",
            errorSR: "un_pw_x"
        })
    }

    // Send the user the JWT
    const jwtToken = process.env.JWT_TOKEN
    const userObj = {
        userid: user.userid,
        id: user.id,
        email: user.email,
        issued: Date.now()
    }
    const token = await jwt.sign(userObj, jwtToken)
    return res.status(200).json({ token, error: false })
})


const signupForm = upload.fields([{
    name: ""
}])
authRouter.post("/signup", upload.single("profile-pic"), async (req, res) => {
    const userDetailsRaw = req.body
    /*
    {
  fieldname: 'profile-pic',
  originalname: 'f1644950-5ee2-489b-9b66-4d9b776c222c.jpeg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 43 00 09 06 07 08 07 06 09 08 07 08 0a 0a 09 0b 0d 16 0f 0d 0c 0c 0d 1b 14 15 10 ... 22105 more bytes>,
  size: 22155
}
     */
    console.log(req.file, req.body)

    const body = req.body



    if (req.body.password !== req.body.confirm) {
        const url = new URL(req.headers.referer)
        url.searchParams.set("error", "Passwords do not match.")

        return res.redirect(decodeURI(url.toString()))
    }
    let hashedPw
    try {
        hashedPw = await bcrypt.hash(body.password, 10)
    } catch (err) {
        const url = new URL(req.headers.referer)
        url.searchParams.set("error", "Internal Server Error.")

        return res.redirect(decodeURI(url.toString()))
    }
    const userid = crypto.randomUUID()

    if (req.file) {
        const result = await storage.put(`${userid}-profile`, req.file.buffer)
        if (result.error) {
            const url = new URL(req.headers.referer)
            url.searchParams.set("error", "Profile Picture upload failure.")

            return res.redirect(decodeURI(url.toString()))
        }
    }
    const user = new User({
        email: body.email,
        hashedPw,
        student: !!body.student,
        username: body.username,
        userid
    })

    const saved = await user.save()

    const tokenObj = {
        email: saved.email,
        userid,
        id: saved.id.toString(),
        issued: Date.now()

    }

    const token = await jwt.sign(tokenObj, process.env.JWT_TOKEN)


    console.log("complete!", token)
    res.header("X-ClassTrivia-Token", token)
    res.redirect("/signup-complete")



})

module.exports = {authRouter}