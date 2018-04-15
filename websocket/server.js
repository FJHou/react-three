var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('welcome use websocket!')
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('rotate', function(msg){
    socket.broadcast.emit('rotating', msg)
  });
  socket.on('stcontrol', function(socket) {
    console.log('a')
    socket.broadcast.emit('stduentControl');
  })
});


http.listen(4000, function(){
  console.log('listening on *:4000');
});