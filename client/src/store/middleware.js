import { startConnecting, isConnected } from "./slices/connectionSlice";
import { io } from "socket.io-client";
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

export const socketMiddleware = (store) => (next) => (action) => {
    if (!startConnecting.match(action)) return next(action);
    const socket = io.connect("http://localhost:3001");
    socket.on("connect", () => {
        console.log("pikala");
        store.dispatch(isConnected());
        // socket.emit("RequestAllMessages");
    });
    next(action);
};
