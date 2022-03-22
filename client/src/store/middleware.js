import { startConnecting, isConnected } from "./slices/connectionSlice";
import { addPlayer } from "./slices/playerSlice";
import { io, Socket } from "socket.io-client";
export const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log("state : ", store.getState());
    console.info("dispatching", action);
    let result = next(action);
    // console.table(store.getState());
    console.log("next state", store.getState());
    console.groupEnd();
    return result;
};

export const socketMiddleware = (store) => {
    let socket = Socket;
    return (next) => (action) => {
        const Connected = socket && store.getState().connection.connected;
        // console.log("pikal");
        if (startConnecting.match(action)) {
            socket = io("http://localhost:3001");
            socket.on("connect", () => {
                store.dispatch(isConnected());
                // console.log(store.getState().connection.connected);
            });
            // store.dispatch(addPlayer(action.payload));
            // }
        }
        if (Connected && addPlayer.match(action)) {
            console.log("pikouuuula");
            socket.emit("new_user", action.payload);
        }
        next(action);
    };
};
