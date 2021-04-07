const socketIO = require('socket.io');

function launch(httpserver) {

    const io = socketIO(httpserver);

    // When a player navigates to the battling page and the socket attempts to connect
    io.sockets.on('connection', (socket)=> {
        
        console.log('A client has connected to the battle server.');
        
        // The name of the channel
        var battle;

        // Player actions
        io.sockets.on('joinbattle', (battleID) => {
            socket.leave(battle);
            battle = battleID;
            socket.join(battle);
        });

        io.sockets.on('attack', (attack)=>{
            console.log('Zounds!');
            let attackResult = {};
            // TODO: use information passed with 'attack' to build an 'attackresult' object to transmit to all clients in the battle.
            io.to(battle).emit('attackresult', attackResult);
        });
    })
    

}

module.exports = {launch};