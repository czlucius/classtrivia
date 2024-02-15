import mongoose from 'mongoose';
const quizSchema = new mongoose.Schema({
    title: String,
    description: String,

    questions: [{
        id: String,
        title: String,
        typ: String,
        image: String,
        options: [String],
        // TODO: Teacher can also access this property
        correct: [String],
        score: Number,
        seconds: Number
    }]
});

quizSchema.set("toJSON", (doc, rto) => {
    rto.id = rto._id.toString()
    rto.type = rto.typ
    delete rto.hashedPw
    delete rto.__v
})
const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;

