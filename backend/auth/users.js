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
import { handleRedirectWithError, hashPassword, isEmailUnique, isUsernameUnique, uploadToS3 } from "../utils";

const authRouter = express.Router();


const authRouter = express.Router();
authRouter.use(expSession({ cookie: { maxAge: 60000 }, secret: process.env.SESSION_SECRET }));
authRouter.use(flash());

// Note: these paths should be accessed via secure HTTPS and not insecure HTTP!
authRouter.post("/login", bodyParser.json(), async (req, res) => {
  const { email, password } = req.body;
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
authRouter.post("/signup", upload.single("profile-pic"), async (req, res) => {
  const userDetailsRaw = req.body;

  // Check if passwords match
  if (req.body.password !== req.body.confirm) {
    handleRedirectWithError(res, true, "Passwords do not match.");
  }

  // Check if email is unique
  if (!await isEmailUnique(userDetailsRaw.email)) {
    handleRedirectWithError(res, true, "Email is already registered.");
  }

  // Check if username is unique
  if (!await isUsernameUnique(userDetailsRaw.username)) {
    handleRedirectWithError(res, true, "Username taken.");
  }

  let hashedPw;
  try {
    // Hash the password
    hashedPw = await hashPassword(userDetailsRaw.password);
  } catch (err) {
    handleRedirectWithError(res, true, "Internal Server Error.");
  }

  const userid = crypto.randomUUID();
  let filename;

  if (req.file) {
    // Upload profile picture to S3
    filename = `profile-pic/${userid}`;
    const result = await storage.put(filename, req.file.buffer);
    if (result.err) {
      handleRedirectWithError(res, true, "Profile Picture upload failure.");
    }
  }

  // Create a new User instance
  const user = new User({
    email: userDetailsRaw.email,
    hashedPw,
    student: !!userDetailsRaw.student,
    username: userDetailsRaw.username,
    name: userDetailsRaw.name,
    _id: userid,
    profilePicUrl: filename ?? undefined
  });

  // Save the user to the database
  const saved = await user.save();

  // Create a JWT token
  const tokenObj = {
    email: saved.email,
    userid,
    id: saved.id.toString(),
    issued: Date.now()
  };

  const token = await jwt.sign(tokenObj, process.env.JWT_TOKEN);

  // Set the token in a cookie and redirect
  res.cookie("ClassTrivia-Token", token, {
    path: "/"
  });
  res.redirect("/signup-complete");
});

export { authRouter };
This modification incorporates the functions from 
