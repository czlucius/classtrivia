import bodyParser from 'body-parser';
import * as socketio from "socket.io";
import http from 'node:http';
import User from "../data/users.mjs";
import jwt from "jsonwebtoken"
export let io: socketio.Server


export function serverIoConnect(httpServer: http.Server) {
    io = new socketio.Server(httpServer)

}
export async function socketAuthManageRole(socket, next) {
    const token = socket.handshake.auth.token || socket.handshake.headers?.token;
    if (!token) {
        console.log("User attempted to connect without a token!")
        return socket.disconnect()
    }
    console.log(token)
    const isValid = await jwt.verify(token, process.env.JWT_TOKEN)
    if (isValid) {

        const user = await User.findById(isValid.id)
        // console.log("user", user)
        if (!user) {
            console.log("Invalid user!")
            // how does one get into this condition?
            // but good to check
            // because all JWTs are signed by the server, and the server only creates them for valid users
            return next(new Error("Invalid user!"))
            // return callback( {
            //     error: true,
            //     errorMsg: "Invalid user!",
            //     errorSR: "student_no_create"
            // })
        }
        if (!user.isTeacher) {
            console.log("Students cannot manage", user)
            return socket.disconnect()
        }
        socket.data = {
            user: user
        }
        next();
    } else {
        const err = new Error("unauthorized");
        next(err);
    }
}