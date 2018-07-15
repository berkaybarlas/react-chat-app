const express = require('express')
const app = express()
const http = require("http")
const socketIo = require("socket.io")
const server = http.createServer(app)
server.listen(3000)
const io = module.exports.io = socketIo(server)

const PORT = process.env.PORT || 3232

const SocketManager = require('./SocketManager')

app.use( express.static(__dirname + '/../../build'))
io.on('connection', SocketManager)

app.listen(PORT, ()=>{
	console.log("Connected to port:" + PORT);
})