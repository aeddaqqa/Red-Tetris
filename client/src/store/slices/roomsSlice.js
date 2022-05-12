import { createSlice } from "@reduxjs/toolkit";

export const roomsSlice = createSlice({
    name: "roomsReducer",
    initialState: {
        loading: false,
        rooms: [],
        error: null,
    },
    reducers: {
        getRoomsRequest: (state, action) => {
            state.loading = true;
        },
        getRoomsSuccess: (state, action) => {
            state.rooms = action.payload;
        },
        getRoomsFailed: (state, action) => {
            state.error = action.payload;
        },
        updateRooms: (state, action) => {
            state.rooms = action.payload;
        },
    },
});

export const { updateRooms, getRoomsRequest, getRoomsSuccess } =
    roomsSlice.actions;

export default roomsSlice.reducer;
