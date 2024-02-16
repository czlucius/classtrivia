import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    hashedPw: String,
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    points: Number,
    profilePicUrl: String,
    isTeacher: Boolean,
    _id: String,
    email: String,
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }]
});

userSchema.set("toJSON", (doc, rto) => {
    rto.id = rto._id.toString()
    delete rto.hashedPw
    delete rto.__v
})
const User = mongoose.model('User', userSchema);
export default User;