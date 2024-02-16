import bodyParser from 'body-parser';
import * as socketio from "socket.io";
import http from 'node:http';
export let io


export function serverIoConnect(httpServer: http.Server) {
    io = new socketio.Server(httpServer)

}
