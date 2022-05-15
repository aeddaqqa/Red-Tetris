const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const Game = require("./classes/Game");

const Tetrimios = require("./classes/tetrominos");
let tetrominos = new Tetrimios();

let rooms = [];
let players = [];
var allClients = [];
let game = new Game();

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
    /*-------------ADD PLAYER-------------*/
    socket.on("addPlayerRequest", (data) => {
        const exist = players.find(
            (player) => player.username === data.username
        );
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
        } else {
            socket.emit("addPlayerFail", { error: "user existe" });
        }
    });
    /*-------------GET ROOMS-------------*/
    socket.on("getRooms", () => {
        socket.emit("getRooms", rooms);
    });
    /*-------------ADD ROOM-------------*/
    socket.on("createRoomRequest", (data) => {
        const exist = rooms.find((room) => room.name === data.room);
        const player = players.find(
            (player) =>
                player.username === data.username &&
                player.socketId === socket.id
        );
        if (!exist) {
            if (data.mode === "battle")
                rooms = [
                    ...rooms,
                    {
                        name: data.room,
                        mode: data.mode,
                        maxPlayers: 5,
                        playersIn: 1,
                        state: false,
                    },
                ];
            else
                rooms = [
                    ...rooms,
                    {
                        name: data.room,
                        mode: data.mode,
                        maxPlayers: 1,
                        playersIn: 1,
                        state: false,
                    },
                ];
            if (player) {
                player.room = data?.room;
                player.admin = true;
            }
            socket.join(data.room);
            socket.emit("createRoomSucces", data.room);
            io.emit("updateRooms", { rooms: rooms });
        }
    });
    /*-------------JOIN ROOM-------------*/
    socket.on("joinRoom", (data) => {
        const joinedRoom = rooms.find((room) => room.name === data.room);
        const player = players.find(
            (player) => player.username === data.username
        );
        if (joinedRoom) {
            if (joinedRoom.mode === "battle" && joinedRoom.playersIn < 5) {
                socket.join(data.room);
                player.room = data?.room;
                player.admin = false;
                joinedRoom.playersIn += 1;
                socket.emit("roomJoinedSuccess", data.room);
                io.to(data.room).emit("chat", {
                    message: `Player ${data.username} joined the room ${data.room}`,
                    type: "join",
                });
                io.emit("updateRooms", { rooms: rooms });
            }
        }
    });

    /*-------------GET PLAYERS-------------*/
    socket.on("getPlayers", (data) => {
        var temp = [];
        var roomPlayers = [];
        const clients = io.sockets.adapter.rooms.get(data);
        if (clients) {
            for (const clientId of clients) {
                temp.push(clientId);
            }
        }
        for (let i = 0; i < players.length; i++) {
            for (let j = 0; j < temp.length; j++) {
                if (players[i].socketId === temp[j]) {
                    roomPlayers.push(players[i]);
                }
            }
        }
        io.to(data).emit("updatePlayers", roomPlayers);
    });
    /*-------------START THE GAME-------------*/
    socket.on("startgame", (data) => {
        const room = rooms.find((room) => room.name === data);
        game.getUser(io, socket.id, room, players).then(async (user) => {
            if (user.admin) {
                const tetros = await tetrominos.getTetriminos();
                game.startGame(io, room, tetros);
                io.emit("updateRooms", { rooms: rooms });
            } else {
                io.to(socket.id).emit("waitForAdmin");
            }
        });
    });
    /*-------------SEND MESSAGE-------------*/
    socket.on("sendMessage", (data) => {
        const player = players.find(
            (player) => player.username === data.username
        );

        io.to(data.room).emit("chat", {
            sender: player,
            message: data.message,
            type: "message",
        });
    });
    /*-------------NEW TETROS-------------*/
    socket.on("newTetriminos", async (data) => {
        const tetriminos = await tetrominos.getTetriminos();
        game.newTetriminos(io, data, tetriminos);
    });
    /*-------------ADD STAGE-------------*/
    socket.on("sendStage", async (data) => {
        // console.log(data);
        const player = players.find((p) => p.username === data.username);
        // console.log(player);
        if (player && player.room === data.room) {
            game.sendStage(io, data.room, data.stage, data.username);
        }
    });
    /*-------------DISCONNECT SOCKET-------------*/
    socket.on("disconnect", () => {
        var i = allClients.indexOf(socket);
        allClients.splice(i, 1);
        console.log("User disconnected =>", socket.id);
    });
});

server.listen(3001, () => {});
