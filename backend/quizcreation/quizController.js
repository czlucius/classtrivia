import express from 'express';

const quizRouter = express.Router(); // Use quizRouter
import Quizzes from '../data/quiz.mjs';
import Quiz from "../data/quiz.mjs";
import bodyParser from "body-parser";
import User from "../data/users.mjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"; // path for schema
quizRouter.use(bodyParser.json())
quizRouter.use(cookieParser())
quizRouter.post('/create-quiz', async (req, res) => {
    try {
        /*
        title: String,
        description: String,

        questions: [{
            id: String,
            title: String,
            type: String,
            image: String,
            options: [String],
            correct: [String],
            score: Number,
            seconds: Number
        }]
         */
        let quizData = {
            title: req.body.title,
            description: req.body.description,
            questions: req.body.questions,
            _id: req.body._id
        }
        const cookies = req.cookies
        const token = cookies["ClassTrivia-Token"]
        const tokenObj = await jwt.verify(token, process.env.JWT_TOKEN)
        if (!tokenObj) {
            return res.status(403).json({
                error: true,
                errorMsg: "Authentication failure",
                errorSR: "no_auth"
            })
        }

        const user = await User.findById(tokenObj.id)
        if (!user.isTeacher) {
            return res.status(400).json({
                error: true,
                errorMsg: "Students cannot upload quizzes!",
                errorSR: "student_no_create"
            })
        }


        console.log("rbeee24", req.body, quizData)
        let newQuiz
        if (false) {
            console.log("_id is present!")
            await Quiz.findByIdAndUpdate(quizData._id, quizData)
            res.status(201, quizData)

        } else {
            quizData._id = undefined
            newQuiz = new Quiz(quizData);
            console.log("aQ8371", newQuiz)

            const savedQuiz = await newQuiz.save();

            user.quizzes.push(savedQuiz._id)
            await user.save()

            res.status(201).json(savedQuiz);

        }


    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


quizRouter.get("/get-all", async (req, res) => {
    const cookies = req.cookies
    const token = cookies["ClassTrivia-Token"]
    const tokenObj = await jwt.verify(token, process.env.JWT_TOKEN)
    if (!tokenObj) {
        return res.status(403).json({
            error: true,
            errorMsg: "Authentication failure",
            errorSR: "no_auth"
        })
    }
    let user = await User.findById(tokenObj.id).populate("quizzes")
    console.log("User is ", user)

    if (!user.isTeacher) {
        return res.status(400).json({
            error: true,
            errorMsg: "Students cannot upload quizzes!",
            errorSR: "student_no_create"
        })
    }


    return res.json(user.quizzes)

})

quizRouter.delete("/", async (req, res) => {
    const cookies = req.cookies
    const token = cookies["ClassTrivia-Token"]
    const tokenObj = await jwt.verify(token, process.env.JWT_TOKEN)
    if (!tokenObj) {
        return res.status(403).json({
            error: true,
            errorMsg: "Authentication failure",
            errorSR: "no_auth"
        })
    }
    let user = await User.findById(tokenObj.id).populate("quizzes")
    console.log("User is ", user)

    if (!user.isTeacher) {
        return res.status(400).json({
            error: true,
            errorMsg: "Students cannot delete quizzes!",
            errorSR: "student_no_create"
        })
    }



    const {quizId} = req.body
    user.quizzes = user.quizzes.filter(quiz => quiz._id !== quizId)
    await user.save()
    return res.status(200).json({
        success: true
    })
})


export default quizRouter;

