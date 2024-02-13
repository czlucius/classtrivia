import {Dispatch, SetStateAction} from "react";

export const JSON_HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

export type ReactState<S> = [S, Dispatch<SetStateAction<S>>]