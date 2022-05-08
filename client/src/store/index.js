import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware";
import connectionReducer from "./slices/connectionSlice";
import playerReducer from "./slices/playerSlice";

const store = configureStore({
    reducer: {
        connection: connectionReducer,
        player: playerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([socketMiddleware, thunk]),
});

export default store;
