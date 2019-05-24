// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5029);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, '/index.html'));
});

// Starts the server.
server.listen(5029, function() {
  console.log('Starting server on port 5029');
});

// Add websocket handlers
io.on('connection', function(socket) {
    socket.on('requestConversion', function(data){
        console.log(data);
    });
    socket.on("click", function () {
        console.log('click');
        socket.emit("clickres");
    })
});