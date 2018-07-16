const express = require('express')
const app = express()
const http = require('http').Server(app)
const fs = require('fs');

const server = http.listen(8081, () => console.log('listen on port 8081'))

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', message)
        let rawdata = fs.readFileSync(__dirname +'/history.json');  
        let history = JSON.parse(rawdata);  
        console.log(history); 
        io.emit('history', history)
        // var data = JSON.stringify(message, null, 2); // {"name": "John", "age": "25"}             

        //  fs.readFile(__dirname +'/history.json', message , function () {
        //     var json = JSON.parse(message);
        //     json.push(message);    
        //     fs.writeFile(__dirname +'/history.json', JSON.stringify(json), function(err){
        //       if (err) throw err;
        //       console.log('The "data to append" was appended to file!');
        //     });
        // })
          
        

        // fs.readFile(__dirname +'/history.json', (err, data) => {  
        //     if (err) throw err;
        //     let student = JSON.parse(data);
        //     console.log(student);
        // });
        
        // console.log('This is after the read call');  

    });
      
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})
