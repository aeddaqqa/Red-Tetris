import { io, Socket } from "socket.io-client";
import { isConnected, startConnecting } from "./slices/connectionSlice";
import {
    addPlayerRequest,
    addPlayerSuccess,
    addPlayerFail,
} from "./slices/playerSlice";

export const socketMiddleware = (store) => {
    let socket = Socket;
    return (next) => (action) => {
        const Connected = store.getState()?.connection?.connected;
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
        }
        if (Connected) {
            if (addPlayerRequest.match(action))
                socket.emit("addPlayerRequest", action.payload);
        }
        next(action);
    };
};
