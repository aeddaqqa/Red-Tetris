import { createSlice } from "@reduxjs/toolkit";

const playerEvents = {
    addUserName: "addUserName",
    addAvatar: "addAvatar",
    createRoom: "createRoom",
};

const initialState = {
    connected: false,
    connecting: false,
    userName: "",
    avatar: "",
    roomName: "",
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        startConnecting(state) {
            state.connecting = true;
        },
        isConnected(state) {
            state.connected = true;
        },
        addUserName(state, action) {
            state.userName = action;
        },
        addAvatar(state, action) {
            state.avatar = action;
        },
        addRoomName(state, action) {
            state.roomName = action;
        },
    },
});

export const {
    startConnecting,
    isConnected,
    addUserName,
    addAvatar,
    addRoomName,
} = playerSlice.actions;
export const chatReducer = playerSlice.reducer;
