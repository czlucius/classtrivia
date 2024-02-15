import {createSlice, Middleware} from "@reduxjs/toolkit";
import {eraseCookie, getCookie, setCookie} from "./persistence.ts";


const loginSlice = createSlice({
    name: "login",
    initialState: {
        login: getCookie("ClassTrivia-Token"),
        name: getCookie("ClassTrivia-Username")
    },
    reducers: {
        setLoggedIn(state, action) {
            state.login = action.payload ? action.payload as string : null
        },
        setName(state, action) {
            state.name = action.payload ? action.payload as string : null
        },
        logout:(state, action) =>  {
            state.login = null
            state.name = null
        }

    }
})

export interface LoginState {
    login: string
    name: string
}
const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
    if (!action["type"].startsWith("login/")) { return next(action); }
    console.log('dispatching', action)
    const result = next(action) as string
    console.log('next state', store.getState())
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const state = store.getState()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (state.login.login) {
        setCookie("ClassTrivia-Token", state.login.login)
    } else {
        eraseCookie("ClassTrivia-Token")
    }
    if (state.login.name) {
        setCookie("ClassTrivia-Username", state.login.name)
    } else {
        eraseCookie("ClassTrivia-Username")
    }
    return result
}

export const {setLoggedIn, logout} = loginSlice.actions
export default loginSlice.reducer

export {localStorageMiddleware}
