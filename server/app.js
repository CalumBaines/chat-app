const express = require('express')
const app = express()
const http = require('http').Server(app)
const fs = require('fs');

const server = http.listen(8081, () => console.log('listen on port 8081'))
const io = require('socket.io')(server);

var clients =[];

io.on('connect', function(socket) {
    console.log("userID " + socket.id);
    io.emit('userID', socket.id)
    let rawdata = fs.readFileSync(__dirname +'/history.json');  
    let history = JSON.parse(rawdata);  
    console.log(history); 
    io.emit('history', history)
});

io.on('connection', (socket) => {
    // var client = socket.id
    // console.log(client)
    // io.emit('connection', client)

    // attempting to change socket id to cutom for the two users
    socket.on('storeClientInfo', function (data) {

        var clientInfo = new Object();
        clientInfo.customId         = data.customId;
        clientInfo.clientId     = socket.id;
        clients.push(clientInfo);
    });

    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', message)
        
    });
      
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})
