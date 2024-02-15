import {createSlice} from "@reduxjs/toolkit";
import {Question} from "../objects/Question.ts";

const initialState: {
    [id: string]: Question
} = {

}
const questionSlice = createSlice({
    name: 'question',
    initialState: initialState,
    reducers: {
        /**
         * Idempotent function to PUT a question.
         */
        putQuestion: (state, action) => {
            const {id, question} = action.payload
            console.log("i get id of123", id, question)
            return {...state, [id]: question}
        },
        clearQuestions: (state, action) => {
            state = {}
            return state
        },
        removeQuestion: (state, action) => {
            const {id} = action.payload
            window.URL.revokeObjectURL(state[id].image)
            delete state[id]
        },
        updateInfo: (state, action) => {
            const {title, desc} = action.payload
            state["title"] = title
            state["desc"] = desc
        },
        setQuestions: (state, action) => {
            const questions = action.payload
            console.log("set qns", questions)
            const a = {}
            console.log("qjs", questions )
            for (const key in questions ) {
                const q = questions[key]
                console.log("iter111", key, q)

                a[q._id] = q
            }
            console.log("ayit42", a)

            return a
        }

    }
});

export const { putQuestion, removeQuestion, clearQuestions, setQuestions} = questionSlice.actions;

export default questionSlice.reducer;