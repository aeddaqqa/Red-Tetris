import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { roomsReducer } from "./slices/roomsSlice";
import { chatsReducer } from "./slices/chatsSlice";
import { playerReducer } from "./slices/playerSlice";
import { connectionReducer } from "./slices/connectionSlice";
import { logger, socketMiddleware } from "./middleware";

export const store = configureStore({
    reducer: {
        connection: connectionReducer,
        rooms: roomsReducer,
        chats: chatsReducer,
        player: playerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([logger, socketMiddleware, thunk]),
});
