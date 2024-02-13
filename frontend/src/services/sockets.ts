import {io, Manager} from "socket.io-client";
import {getCookie} from "./persistence.ts";

export const socketManager = new Manager("ws://localhost:9109/", {
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




playSocket.on("users", response => {
    console.log("users response  11", response)
})




console.log("sockets")