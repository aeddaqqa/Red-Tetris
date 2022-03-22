import { createSlice } from "@reduxjs/toolkit";

const playerEvents = {
    addUserName: "addUserName",
    addAvatar: "addAvatar",
    createRoom: "createRoom",
};

const initialState = {
    userName: "",
    avatar: "",
    roomName: "",
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
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

export const { addUserName, addAvatar, addRoomName } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
