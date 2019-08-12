var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.send('<h1>Hello World</h1>');
});

io.on('connection', function (socket) {
  console.log('User connected via socket');
  socket.on('chat message', function(msg) {
    console.log('message:', msg);
    console.log('>>> broadcast message');
    io.emit('chat message', msg);
  });
});

server.listen(3001, function() {
  console.log('Listening on 3001');
});
