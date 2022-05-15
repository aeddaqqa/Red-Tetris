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
                //console.log("emited from back data",data);
                store.dispatch(addToChat(data));
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
        }
        next(action);
    };
};
