
import {createSlice} from "@reduxjs/toolkit";

const initialState= {
    title: "",
    desc: "",
    _id: ""
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
        },
        update_Id: (state, action) => {
            state["_id"] = action.payload
}

    }
});

export const { updateTitle, updateDesc, update_Id } = quizSlice.actions;

export default quizSlice.reducer;