import express from 'express';
import mongoose from 'mongoose';
import User from '../data/users.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import { S3Interactor } from '../data/storage.mjs';
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
const upload = multer()
const storage = new S3Interactor()


export const authRouter = new express.Router()

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
    res.cookie("ClassTrivia-Token", token, {
        path: "/"
    })
    return res.status(200).json({ token, error: false })
})


const signupForm = upload.fields([{
    name: ""
}])

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: 'classtrivia@hotmail.com',
        pass: 'Y;2*TN{tAD`}cf9H'
    }
});
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
    const emailCheck = await User.findOne({email: body.email})
    console.log(emailCheck)
    if (emailCheck) {
        // email exists
        // reject request
        const url = new URL(req.headers.referer)
        url.searchParams.set("error", "Email is already registered.")

        return res.redirect(decodeURI(url.toString()))
    }

    const usernameCheck = await User.findOne({username: body.username})
    if (usernameCheck) {
        // email exists
        // reject request
        const url = new URL(req.headers.referer)
        url.searchParams.set("error", "Username taken.")

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
    let filename

    if (req.file) {
        filename = `profile-pic/${userid}`
        const result = await storage.put(filename, req.file.buffer)
        if (result.error) {
            const url = new URL(req.headers.referer)
            url.searchParams.set("error", "Profile Picture upload failure.")

            return res.redirect(decodeURI(url.toString()))
        }
    }
    const user = new User({
        email: body.email,
        hashedPw,
        isTeacher: !body.student,
        username: body.username,
        name: body.name,
        _id: userid,
        profilePicUrl: filename ?? undefined
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
    res.cookie("ClassTrivia-Token", token, {
        path: "/"
    })
    res.cookie("ClassTrivia-Username", saved.username)
    res.cookie("ClassTrivia-UserDetails", saved)
    res.redirect("/signup-complete")

    await transporter.sendMail({
        from: 'classtrivia@hotmail.com',
        to: saved.email || 'javinjj.22@ichat.sp.edu.sg', // Default to my email for testing if none included
        subject: 'ClassTrivia Registration',
        html: `
        <h1>Thanks for registering for ClassTrivia!</h1>
        
        Here are your user details:
        <p>${saved.email}</p>
        <p>Username: @${saved.username}</p>
        <p>Password was set during registration</p>
 
      `})


})


authRouter.get("/userDetails", cookieParser(), async (req, res) => {
    const cookies = req.cookies
    const token = cookies["ClassTrivia-Token"]
    let tokenObj
    if (token) {
        tokenObj = await jwt.verify(token, process.env.JWT_TOKEN)
    } else {
        return res.status(403).json({
            error: true,
            errorMsg: "No token!",
            errorSR: "no_token"
        })
    }

    if (!tokenObj) {
        return res.status(403).json({
            error: true,
            errorMsg: "Authentication failure",
            errorSR: "no_auth"
        })
    }

    const user = await User.findById(tokenObj.id)
    return res.json(user)
})

authRouter.get("/username/:id", async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id).select("username")
    return res.json({
        username: user?.username
    })

})