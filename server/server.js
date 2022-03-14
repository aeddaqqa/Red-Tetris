const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
});

let rooms = [];

/***************** --Socket-- *********************/

io.on("connection", (socket) => {
  // ...
  console.log(`connected ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`disconnected ${socket.id}`);
  });
  socket.on("joinRoom", ({ roomName, mode }) => {
    // socket.join("pikala");
  });
  socket.on("getRooms", () => {
    // console.log(rooms);
    // socket.emit("updateRooms", rooms);
    socket.broadcast.emit("updateRooms", "world");
  });
  socket.on("addRoom", (room) => {
    rooms.push(room);
    console.log(room);
    io.emit("updateRooms", "test");
    // socket.emit("updateRooms", rooms);
  });
});
/******************** ---- ************************/

httpServer.listen(3001, () => {
  console.log("listening on port 3001");
});
