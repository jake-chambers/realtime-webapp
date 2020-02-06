console.log("Welcome")

var socket = io();
socket.emit('test', "this is a test lad");