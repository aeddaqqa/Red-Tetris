import { io, Socket } from "socket.io-client";
import { isConnected, startConnecting } from "./slices/connectionSlice";
import {
    addPlayerRequest,
    addPlayerSuccess,
    addPlayerFail,
    addRoomName,
    setAdmin,
    addRoomRequest,
    joinRoomRequest,
    addToChat,
    startTheGameRequest,
    setAdminError,
    sendMessage,
    newTetrosRequest,
    sendStage,
    addWallRequest,
    startTheGame,
    concatTetros,
    setStage,
} from "./slices/playerSlice";
import { updatePlayers } from "./slices/playersSlice";
import {
    updateRooms,
    getRoomsRequest,
    getRoomsSuccess,
    getRoomsFailed,
} from "./slices/roomsSlice";

export const socketMiddleware = (store) => {
    let socket = Socket;
    return (next) => (action) => {
        const Connected = store.getState()?.connection?.connected;
        const user = store.getState().player;
        if (startConnecting.match(action)) {
            socket = io("http://localhost:3001");
            socket.on("connect", () => {
                store.dispatch(isConnected());
            });
            socket.on("addPlayerSuccess", (data) => {
                store.dispatch(addPlayerSuccess(data));
            });
            socket.on("addPlayerFail", (data) => {
                store.dispatch(addPlayerFail(data));
            });
            socket.on("getRooms", (data) => {
                store.dispatch(getRoomsSuccess(data));
            });
            socket.on("updateRooms", (data) => {
                store.dispatch(updateRooms(data.rooms));
            });
            socket.on("createRoomSucces", (data) => {
                store.dispatch(addRoomName(data));
                store.dispatch(setAdmin(1));
                socket.emit("getPlayers", data);
            });
            socket.on("roomJoinedSuccess", (data) => {
                store.dispatch(addRoomName(data));
                store.dispatch(setAdmin(0));
                socket.emit("getPlayers", data);
            });
            socket.on("updatePlayers", (data) => {
                store.dispatch(updatePlayers(data));
            });
            socket.on("chat", (data) => {
                store.dispatch(addToChat(data));
            });
            socket.on("waitForAdmin", () => {
                store.dispatch(setAdminError());
            });
            socket.on("startGame", (data) => {
                store.dispatch(startTheGame(data));
            });
            socket.on("newTetriminos", (data) => {
                console.log("new tetros", data);
                store.dispatch(concatTetros(data));
            });
            socket.on("getstages", (data) => {
                store.dispatch(setStage(data));
            });
            socket.on("addWall", (data) => {
                console.log("recieve emit to add wall");
            });
        }
        if (Connected) {
            if (addPlayerRequest.match(action))
                socket?.emit("addPlayerRequest", action.payload);
            else if (getRoomsRequest.match(action)) socket?.emit("getRooms");
            else if (addRoomRequest.match(action))
                socket?.emit("createRoomRequest", action.payload);
            //joinning to a room request
            if (joinRoomRequest.match(action)) {
                socket?.emit("joinRoom", {
                    room: action.payload,
                    username: user.userName,
                });
            }
            //adding the room with check if its duplicated
            if (startTheGameRequest.match(action)) {
                socket.emit("startgame", action.payload);
            }

            //sending message to room
            if (sendMessage.match(action)) {
                socket.emit("sendMessage", {
                    message: action.payload,
                    username: user.userName,
                    room: user.roomName,
                });
            }
            if (newTetrosRequest.match(action)) {
                console.log(action.payload);
                socket.emit("newTetriminos", action.payload);
            }
            //send stage
            if (sendStage.match(action)) {
                socket.emit("sendStage", {
                    stage: action.payload,
                    username: user.userName,
                    room: user.roomName,
                });
            }
            //send stage
            if (addWallRequest.match(action)) {
                console.log("jksnjsbvjksv");
                // socket.emit("addWall", {username: user.userName, room: user.roomName })
            }
        }
        next(action);
    };
};
