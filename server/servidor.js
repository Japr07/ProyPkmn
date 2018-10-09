const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const servidor = http.createServer(app);
const io = socketio.listen(servidor);

const puerto = process.env.PORT || 2000;

//directorio de la web
app.use(express.static('client'));
//iniciacion de la conexion con websockets
require('./sockets')(io)
//puerto de escucha del servidor
servidor.listen(puerto, function () {
  console.log('Servidor ejecutandose en el puerto: %d!', puerto);
});