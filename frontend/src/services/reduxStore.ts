import { configureStore } from '@reduxjs/toolkit';
import questionStore from "./questionStore.ts";
import quizStore from "./quizStore.ts";
import loginStore, {localStorageMiddleware} from "./loginStore.ts";


const store = configureStore({
    reducer: {
        question: questionStore,
        quiz: quizStore,
        login: loginStore
    }, middleware: (gDM) => gDM().concat(localStorageMiddleware)
});

export default store;