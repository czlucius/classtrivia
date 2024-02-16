import {getCookie} from "./persistence.ts";

export function getUsername() {
    return getCookie("ClassTrivia-Username")
}