import express from 'express';
const quizRouter = express.Router(); // Use quizRouter 
import Quizzes from '../data/quiz.mjs';
import Quiz from "../data/quiz.mjs";
import bodyParser from "body-parser"; // path for schema
quizRouter.use(bodyParser.json())
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
    const quizData = {
      _id: req.body._id,
      title: req.body.title,
      description: req.body.description,
      questions: req.body.questions,
    }

    console.log(req.body, quizData)
    const newQuiz = new Quiz(quizData);
    console.log(newQuiz)
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default quizRouter;