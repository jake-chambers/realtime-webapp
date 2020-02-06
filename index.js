var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
});

server.listen(8082, () => {
    console.log("Whaaaaguan fam we bin chillin")
});

