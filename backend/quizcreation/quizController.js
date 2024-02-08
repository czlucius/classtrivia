const express = require('express');
const quizRouter = express.Router(); // Use quizRouter 
const Quizzes = require('../data/quiz'); // pathj for schema

quizRouter.post('/create-quiz', express.json(), async (req, res) => {
  try {
    const quizData = req.body;
    const newQuiz = new Quiz(quizData);
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = quizRouter;

