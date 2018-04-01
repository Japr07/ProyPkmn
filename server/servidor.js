var express = require('express');
var app = express();
var servidor = require('http').Server(app);
var io = require('socket.io').listen(servidor);
var puerto = process.env.PORT || 2000;

//directorio de la web
app.use(express.static('client'));
//iniciacion de la conexion con websockets
io.sockets.on('connection', function (socket) {
  console.log(socket.id + " ha iniciado una sesion socket");
  //enviar y recibir un msj en el chat
  socket.on('sendMessage', function (data) {
    io.sockets.emit('newMessage', {
      msj: data
    });
  });
  //finalizacion de la conexion con websockets
  socket.on('disconnect', function () {
    console.log(socket.id + ' ha finalizado la sesion socket');
  });
});
//puerto de escucha del servidor
servidor.listen(puerto, function () {
  console.log('Servidor ejecutandose en el puerto: %d!', puerto);
});