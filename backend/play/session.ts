import {Player} from "./Player"
import {Question} from "./Question";
// export interface Session {
//     id: string
//     code: string
//     players: Player[]
//     questions: Question[]
//     current: number
// }

import mongoose  from 'mongoose';
import {Schema} from "mongoose";
const sessionSchema = new Schema({
    _id: String,
    current: Number,
    quiz: { type: String, ref: 'Quiz' },
    users: [{type: String, ref: 'User'}],
    owner: {type: String, ref: 'User'},
    results: [{
        user: {type: String, ref: 'User'},
        answers: [String],
        correct: [Boolean]
    }]
});

// @ts-ignore
sessionSchema.set("toJSON",  (doc, rto) => {
    delete rto.__v
})
export const Session = mongoose.model('Session', sessionSchema);
