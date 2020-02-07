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
    Counter.deleteMany({}).exec();

    var newCounter = new Counter({name: 'counter', value: 0})
    newCounter.save(function(err){
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

app.get('/get-counter', function(req,res){
    Counter.find((error, result) => {
            if (error) throw error
            res.send(result);
    })
})

//sockey hockey
io.on('connection', (socket) => {
    console.log("connected")
    socket.on('increment', (data) => {
        console.log("time to increment");
        
        Counter.findOne({name:'counter'}, function (error, result){
            if (error) throw error 
            update(result,socket)
        })
    });

    socket.on('disconnect', (data) => {
        console.log("disconnected")
    })
});

function update(document,socket){
    console.log("Before update " + document.value)
    var number = document.value
    number++;
    Counter.findOneAndUpdate({name:'counter'}, {value: number},{new:true}, function(error, response){
        if(error) throw error;
        console.log("After update: " + response)
        // io.sockets.emit('updated', response.value);
        // this one effects everyone except the socket who starts it !! lit
        // socket.broadcast.emit('updated', response.value);
    })
}