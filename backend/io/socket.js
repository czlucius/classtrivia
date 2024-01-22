const socketio = require("socket.io")
const bodyParser = require("body-parser");
const {httpServer} = require("../index");
const io = new socketio.Server(httpServer)


module.exports = {io}