
var express = require("express");
var bodyParser = require("body-parser");
var socket = require("socket.io");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
// var server;

db.sequelize.sync().then(function () {
    // server = app.listen(PORT, function () {
    //     console.log("App listening on PORT " + PORT);
    // });
});


var server = app.listen(PORT, function () {
    console.log("listening on ", PORT);
});

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {

    console.log('new connection', socket.id);

    socket.on('switchRoom', function (newroom) {
        // leave the current room (stored in session)
        socket.leave(socket.room);
        // join new room, received as function parameter
        socket.join(newroom);
        // socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left this room');
        // update socket session room title
        socket.room = newroom;
        // socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
        // socket.emit('updaterooms', rooms, newroom);
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        // echo globally that this client has left
        console.log("left:", socket.room);
        socket.leave(socket.room);
    });

    // socket mouse data
    socket.on("mouse", mouseMsg);

    function mouseMsg(data) {
        console.log("socket.room: ",socket.room);
        // socket.broadcast.emit('mouse', data);
        io.sockets.in(socket.room).emit('mouse', data);
        console.log(data);
    }


    // socket color data
    socket.on("color", colorMsg);

    function colorMsg(data) {
        console.log("socket.room: ", socket.room);
        // socket.broadcast.emit('mouse', data);
        io.sockets.in(socket.room).emit('color', data);
        console.log(data);
    }
}