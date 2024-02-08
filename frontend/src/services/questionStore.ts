import {createSlice} from "@reduxjs/toolkit";
import {Question} from "../Question.ts";

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
            state[id] = question
        },
        clearQuestions: (state, action) => {
            state = {}
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
        }
    }
});

export const { putQuestion, removeQuestion, clearQuestions} = questionSlice.actions;

export default questionSlice.reducer;