import {io, Manager} from "socket.io-client";
import {getCookie} from "./persistence.ts";

const url = window.location.host === "localhost:5173" ? "ws://localhost:9109/" : "/"
export const socketManager = new Manager(url, {
    reconnectionDelayMax: 10000
});
export const socket = socketManager.socket("/", {
    auth: {
        token: getCookie("ClassTrivia-Token")
    }
});



export const playSocket = socketManager.socket("/api/play", {
    auth: {
        token: getCookie("ClassTrivia-Token")
    }
});

const gameSocket = socketManager.socket("/api/game", {
    auth: {
        token: getCookie("ClassTrivia-Token")
    }
})


playSocket.on("answers", response=> {
    console.log("answers ev", response)
})

playSocket.on("qnEnd", response=> {
    console.log("qnEnd ev", response)
})


playSocket.on("users", response => {
    console.log("users response  11", response)
})




console.log("sockets")