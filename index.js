var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var mongoose = require('mongoose');
var io = require('socket.io')(server);
var bodyParser = require("body-parser");
var Counter = require('./counter-schema');


//mongo stuff
mongoose.connect('mongodb://127.0.0.1:27017/socket',{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => {
    console.log('connected to database')
    var newCounter = new Counter({name: 'counter', value: 0})
    newCounter.save(function(err,counter){
        if (err) throw err;

        console.log ("Successfully saved");
    })

})


//server stuff
server.listen(3000, () => {
    console.log('Server listening at port 3000');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/get-count', function(req,res){
})


//sockey hockey
io.on('connection', (socket) => {
    console.log("were living and thriving")
    // when the client emits 'test', this listens and executes

    socket.on('test', (data) => {
        console.log("i have received ur test lad");
    });
    socket.on('increment', (data) => {
        console.log("im gunna increment")
    })
    socket.on('disconnect', (data) => {
        console.log("disconnected")
    })
});