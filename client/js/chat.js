jQuery(function ($) {
  var socket = io();
  var $enviarMensaje = $('#chat-enviar');
  var $mensaje = $('#chat-mensaje');
  var $chat = $('#chat');

  $enviarMensaje.submit(function (e) {
    e.preventDefault();
    socket.removeAllListeners();
    if ($mensaje.val() !== '') {
      socket.emit('sendMessage', $mensaje.val());
      $mensaje.val('');

    }
    socket.on('newMessage', function (data) {
      $chat.append(socket.id+' - ' + data.msj + '<br>');
    });
  });
});