import {Player} from "./Player"
import {Question} from "./Question";
// export interface Session {
//     id: string
//     code: string
//     players: Player[]
//     questions: Question[]
//     current: number
// }

import mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
    _id: String,
    quiz: { type: String, ref: 'Quiz' },
    users: [{type: String, ref: 'User'}],
    owner: {type: String, ref: 'User'}
});

// @ts-ignore
sessionSchema.set("toJSON",  (doc, rto) => {
    delete rto.hashedPw
    delete rto.__v
})
export const Session = mongoose.model('Session', sessionSchema);
