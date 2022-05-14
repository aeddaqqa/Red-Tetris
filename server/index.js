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
    socket.on("join_room", (data) => {
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
                // io.to(data.room).emit("chat", {
                //     message: `Player ${data.username} joined the room ${data.room}`,
                //     type: "join",
                // });
                io.emit("updateRooms", { rooms: rooms });
            }
        }
        // } else if (data.hash && data.room) {
        //     socket.join(data.room);
        //     socket.emit("room_created", data.room);
        //     io.to(data.room).emit("chat", {
        //         message: `Player ${data.username} created the room ${data.room}`,
        //         type: "join",
        //     });
        //     io.emit("update_rooms", { rooms: rooms });
        // }
    });
    /*-------------DISCONNECT SOCKET-------------*/
    socket.on("disconnect", () => {
        var i = allClients.indexOf(socket);
        allClients.splice(i, 1);
        console.log("User disconnected =>", socket.id);
    });
});

server.listen(3001, () => {});
