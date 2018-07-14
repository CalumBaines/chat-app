const express = require('express')
const app = express()
const http = require('http').Server(app)

// app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'))

const server = http.listen(8081, () => console.log('listen on port 3000'))

const io = require('socket.io')(server);


// io.on('connection', function(socket) {
//     console.log(socket.id)
    
// });

io.on('connection', (socket) => console.log(socket.id))


