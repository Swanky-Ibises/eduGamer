module.exports = function(socket) {
  socket.emit('hello', { message: 'You have joined the chat client!' });
  socket.on('connected', function(data) {
    console.log(data);
  });
};