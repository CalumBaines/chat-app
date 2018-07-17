const express = require('express')
const app = express()
const http = require('http').Server(app)
const fs = require('fs');

const server = http.listen(8081, () => console.log('listen on port 8081'))

const io = require('socket.io')(server);

io.on('connect', function(socket) {
    console.log("userID " + socket.id);
    io.emit('userID', socket.id)
});

io.on('connection', (socket) => {
    var client = socket.id
    console.log(client)
    // io.emit('connection', client)

    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', message)
        // let rawdata = fs.readFileSync(__dirname +'/history.json');  
        // let history = JSON.parse(rawdata);  
        // console.log(history); 
        // io.emit('history', history)
    });
      
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})
