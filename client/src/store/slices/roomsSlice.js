import { createSlice } from "@reduxjs/toolkit";

const roomsEvents = {
    // addUserName: "addUserName",
    // addAvatar: "addAvatar",
    // createRoom: "createRoom",
};

const initialState = {
    rooms: [],
};

const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        addRoom(state, action) {
            state.rooms = [...state.rooms, action];
        },
    },
});

export const { addRoom } = roomsSlice.actions;
export const roomsReducer = roomsSlice.reducer;
