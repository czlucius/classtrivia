const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    hashedPw: String,
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    points: Number,
    profilePicUrl: String,
    isTeacher: Boolean,
    userid: String
});

userSchema.set("toJSON", (doc, rto) => {
    rto.id = rto._id.toString()
    delete rto.hashedPw
    delete rto.__v
})
const User = mongoose.model('User', userSchema);
module.exports = User