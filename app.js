const express = require("express");
const socketio = require("socket.io");
const app = express();
const whoamiRouter = require("./public/router/whoamiRouter");
const chatroomRouter = require("./public/router/chatroomRouter");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", whoamiRouter);

var name;
app.get('/chat', function(req, res) {
    res.render('index', {
        username: name
    });
});


const server = app.listen(process.env.PORT || 3000, () => {
  console.log("server is running");
});

// Initialize socket for the server
const io = socketio(server);
io.on("connection", (socket) => {
  console.log("New user connected");

  socket.username = name;
  socket.on("change_username", (data) => {
    name = data.username;
    socket.username = data.username;
  });

  // handle the new message event
  socket.on("new_message", (data) => {
    console.log("new message");
    io.sockets.emit("receive_message", {
      username: socket.username,
      message: data.message,
    });
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", {
      username: socket.username,
    });
  });
});
