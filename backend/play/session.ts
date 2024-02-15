import {Player} from "./Player"
import {Question} from "./Question";
// export interface Session {
//     id: string
//     code: string
//     players: Player[]
//     questions: Question[]
//     current: number
// }

import mongoose, {Types} from 'mongoose';
import {Schema} from "mongoose";
import ObjectId = Types.ObjectId
const sessionSchema = new Schema({
    _id: String,
    current: Number,
    quiz: { type: String, ref: 'Quiz' },
    users: [{type: String, ref: 'User'}],
    owner: {type: String, ref: 'User'},
    results: {
        type: Map,
        of: {
            user: {type: String, ref: 'User'},
            answers: [{
                questionId: String,
                mine: String,
                correct: Boolean,
                modelAns: [String]
            }],
            points: Number
        }
    }
});

// @ts-ignore
sessionSchema.set("toJSON",  (doc, rto) => {
    delete rto.__v
})
export const Session = mongoose.model('Session', sessionSchema);
