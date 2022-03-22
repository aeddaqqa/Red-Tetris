import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log("state : ", store.getState());
    console.info("dispatching", action);
    let result = next(action);
    // console.table(store.getState());
    console.log("next state", store.getState());
    console.groupEnd();
    return result;
};

export const store = configureStore({
    reducer: {
        rooms: roomsReducer,
        chats: chatReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([chatMiddleware, logger, thunk]),
});
