const mongoose = require('mongoose');

const quizzesSchema = new mongoose.Schema({
  quizId: String,
  questions: [{
    id: String,
    type: String, // Multiple Choice (MCQ), Multi Select (MS)
    score: Number, // Marks awarded for correct answer
    choices: [{
      value: String,
      correct: Boolean
    }],
  }]
});

const Quizzes = mongoose.model('Quizzes', quizzesSchema);

module.exports = Quizzes;
