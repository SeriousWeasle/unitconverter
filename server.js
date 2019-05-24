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
        console.log('click @' + socket.id);
        socket.emit("clickres");
    });

    socket.on('requestTypes', function() {
        socket.emit('convtypes', {out:converters});
    });

    socket.on('requestDistConv', function(data) {
        socket.emit('returnDist', convertdist(data.val_in, data.fact_in, data.unit_in, data.fact_out, data.unit_out));
    });
});


// Converter types
const converters = ['dist', 'time', 'mass', 'vel'];
const units = {
    dist:
    {
        meter: 1,
        foot: 0.3048,
        inch: 0.0254,
        yard: 0.9144,
        nmile: 1852,
        mile: 1609.34,
        banana: 0.18
    },
    time:
    {
        second: 1,
        minute: 0.0166667,
        hour: 0.00027777833333,
        day: 1.157409722208333465e-5,
        week: 1.653442460297619205e-6,
        month: 3.805178478297558514e-7,
        year: 3.170985540296803748e-8,
        shrek: 1.7543859649122807017543859649123e-4
    },
    mass:
    {
        gram: 1,
        impton: 9.8421e-7,
        uston: 1.10231520208e-6,
        stone: 0.000157473,
        pound: 0.00220462,
        ounce: 0.035274
    },
    vel:
    {
        meterpersecond: 1,
        knot: 1.94384
    }
};

function convertdist (val_in, fact_in, unit_in, fact_out, unit_out) {
    mult_in = units.dist[unit_in];
    mult_out = units.dist[unit_out];

    output = (val_in * fact_in * mult_in) / (fact_out * mult_out);
    return {type: 'dist', val: output};
}