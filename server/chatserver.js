const socketIO = require('socket.io');
const port = require('./index').port;

const launch = function(httpserver) {

    const io = socketIO(httpserver);

    // Code to run when a client connects
    io.sockets.on('connection', (socket)=>{
        //console.log(socket);
    })
}

module.exports = {launch};