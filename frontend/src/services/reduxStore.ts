import { configureStore } from '@reduxjs/toolkit';
import questionStore from "./questionStore.ts";
import quizStore from "./quizStore.ts";


const store = configureStore({
    reducer: {
        question: questionStore,
        quiz: quizStore
    }
});

export default store;