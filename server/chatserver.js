const socketIO = require('socket.io');
const port = require('./index').port;

const launch = function(httpserver) {

    const io = socketIO(httpserver);

    // Code to run when a client connects
    io.sockets.on('connection', (socket)=>{

        let currentchannel = 'lobby';
        socket.join(currentchannel);
        socket.emit('chat','Welcome!');

        socket.on('chat', (m)=>{
            socket.to(currentchannel).emit('chat', m);
            console.log(socket.rooms);
        })

        socket.on('joinchannel', (c)=>{
            socket.leave(currentchannel);
            currentchannel=c;
            socket.join(currentchannel);
        })
    })
}

module.exports = {launch};