var io = require('../server.js');

var usersConnected = 0;

exports.connectionHandler = function(socket) {
  console.log('User connected via socket.io');
  socket.emit('hello', { message: 'You have joined the chat client!' });

  socket.on('connected', function(data) {
    usersConnected += 1;
    io.emit('newUserJoined', { message: 'A new user has joined', usersConnected: usersConnected });
  });

  socket.on('postMessage', function(data) {
    var user = data.user;
    var text = data.text;
    io.emit('newMessage', { user: user, text: text });
  });

  socket.on('disconnect', function() {
    console.log('User disconnected via socket.io');
    usersConnected -= 1;
    io.emit('userLeft', { message: 'A user has left the chat client', usersConnected: usersConnected });
  })
};
