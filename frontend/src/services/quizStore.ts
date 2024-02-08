
import {createSlice} from "@reduxjs/toolkit";

const initialState= {
    title: "",
    desc: ""
}
const quizSlice = createSlice({
    name: 'quiz',
    initialState: initialState,
    reducers: {
        updateTitle: (state, action) => {
            const title = action.payload
            state["title"] = title
        },
        updateDesc: (state, action) => {
            const desc = action.payload
            state["desc"] = desc
        }

    }
});

export const { updateTitle, updateDesc } = quizSlice.actions;

export default quizSlice.reducer;