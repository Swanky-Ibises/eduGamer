var io = require('../server.js');

exports.connectionHandler = function(socket) {
  console.log('User connected via socket.io');
  socket.emit('hello', { message: 'You have joined the chat client!' });

  socket.on('connected', function(data) {
    io.emit('newUserJoined', { message: 'A new user has joined' });
  });

  socket.on('postMessage', function(data) {
    var user = data.user;
    var text = data.text;
    console.log(io);
    io.emit('newMessage', { user: user, text: text });
  });

  socket.on('disconnect', function() {
    console.log('User disconnected via socket.io');
    io.emit('userLeft', { message: 'A user has left the chat client' });
  })
};
