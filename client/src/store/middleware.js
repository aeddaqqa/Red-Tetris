import { io, Socket } from "socket.io-client";
export const socketMiddleware = (store) => {
    let socket = Socket;
    return (next) => (action) => {
        next(action);
    };
};
