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
            // crear un nuevo jugadory agregarlo a una lista
            players[socket.id] = {
                x: Math.floor(Math.random() * 700) + 50,
                y: Math.floor(Math.random() * 500) + 50,
                playerId: socket.id
            };
            // enviar el nuevo player
            socket.emit('currentPlayers', players);
            
            // actualizar a los demas players conectados sobre el nuevo player
            socket.broadcast.emit('newPlayer', players[socket.id]);

            // sacar al player que se ha desconectado de la lista de player
            socket.on('disconnect', function () {
                console.log('user disconnected: ', socket.id);
                delete players[socket.id];
                // emitir un mensaje a todos los player de la lista sobre el player que se desconecto
                io.emit('disconnect', socket.id);
            });

            // actualizar la posicion del player a los demas cuando se mueva
            socket.on('playerMovement', movementData => {
                players[socket.id].x = movementData.x;
                players[socket.id].y = movementData.y;
                players[socket.id].animacion = movementData.animacion;
                // emitir el mensaje que el player se ha movido a todos los player en la lista
                io.sockets.emit('playerMoved', players[socket.id]);
            });
        });
    }