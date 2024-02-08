const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
    _id: String,
    questions: [{
        id: String,
        type: String,
        photo: String,
        correctAnswer: [{
            description: String,
            correct: Boolean
        }],
        value: Number,
        data: [],
        score: Number,
        seconds: Number
    }]
});

quizSchema.set("toJSON", (doc, rto) => {
    rto.id = rto._id.toString()
    delete rto.hashedPw
    delete rto.__v
})
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz

