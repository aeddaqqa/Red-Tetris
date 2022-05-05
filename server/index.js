const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

let rooms = [];
let players = [];
var allClients = [];

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

app.use(cors());

io.on("connection", (socket) => {
    allClients.push(socket);
    console.log("userConnected =>", socket.id);
    /**||||||||||||||||||||||||||||||||||||||||||*/
    socket.on("addPlayerRequest", (data) => {
        const exist = players.find(
            (player) => player.username === data.username
        );
        console.log(data);
        if (!exist) {
            players = [
                ...players,
                {
                    username: data.username,
                    socketId: socket.id,
                    avatar: data.avatar,
                    room: "",
                },
            ];
            socket.emit("addPlayerSuccess", {
                username: data.username,
                avatar: data.avatar,
            });
        }
        // } else {
        //     socket.emit("user_exists", { error: "user existe" });
        // }
    });
    /**||||||||||||||||||||||||||||||||||||||||||*/
    socket.on("disconnect", () => {
        var i = allClients.indexOf(socket);
        allClients.splice(i, 1);
        console.log("User disconnected =>", socket.id);
    });
});

server.listen(3001, () => {});
