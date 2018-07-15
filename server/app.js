const express = require('express')
const app = express()
const http = require('http').Server(app)

const server = http.listen(8081, () => console.log('listen on port 8081'))

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', message)
    });
      
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})
