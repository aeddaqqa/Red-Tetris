import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware";
import connectionReducer from "./slices/connectionSlice";
import playerReducer from "./slices/playerSlice";
import roomsReducer from "./slices/roomsSlice";

const store = configureStore({
    reducer: {
        connection: connectionReducer,
        player: playerReducer,
        rooms: roomsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([socketMiddleware, thunk]),
});

export default store;
