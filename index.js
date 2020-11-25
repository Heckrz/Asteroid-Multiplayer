var express = require('express');
var socket = require('socket.io');


var app = express();

var server = app.listen(4000,function(){
    console.log('hi');
});

app.use(express.static('./html/cw.html'));
var io = socket(server);

io.on('connection',function(socket){
    console.log('socket connection');
});


