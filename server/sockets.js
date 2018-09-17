    module.exports = function (io) {
        var players = {};
        let mensajes = new Array();
        io.sockets.on('connection', socket => {
            console.log(socket.id + " ha iniciado una sesion socket");
            //enviar y recibir un msj en el chat
            /////////////CHAT/////////////
            socket.on('mensaje', data => {
                //limitar los mensajes que se muestran en el chat
                if (mensajes.length > 99) {
                    mensajes.shift();
                }
                mensajes.push(data);
                io.sockets.emit('nuevoMensaje', mensajes);
            });
            /////////////JUEGO/////////////
            // crear un nuevo jugador
            players[socket.id] = {
                x: Math.floor(Math.random() * 700) + 50,
                y: Math.floor(Math.random() * 500) + 50,
                playerId: socket.id
            };
            // send the players object to the new player
            socket.emit('currentPlayers', players);
            
            // update all other players of the new player
            socket.broadcast.emit('newPlayer', players[socket.id]);

            // when a player disconnects, remove them from our players object
            socket.on('disconnect', function () {
                console.log('user disconnected: ', socket.id);
                delete players[socket.id];
                // emit a message to all players to remove this player
                io.emit('disconnect', socket.id);
            });

            // when a player moves, update the player data
            socket.on('playerMovement', movementData => {
                players[socket.id].x = movementData.x;
                players[socket.id].y = movementData.y;
                players[socket.id].animacion = movementData.animacion;
                // emit a message to all players about the player that moved
                io.sockets.emit('playerMoved', players[socket.id]);
            });
        });
    }