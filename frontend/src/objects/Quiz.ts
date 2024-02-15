import {Question} from "./Question.ts";

export interface Quiz {
    "_id": string,
    "title": string,
    "description": string,
    "questions": Question[]
}