import { createSlice } from "@reduxjs/toolkit";

// addRoomName,
// addRoomRequest,
// joinRoomRequest,

export const playerSlice = createSlice({
    name: "playerReducer",
    initialState: {
        userName: null,
        roomName: null,
        avatar: null,
        error: null,
        roomError: null,
        loading: false,
        chat: [],
    },
    reducers: {
        addPlayerRequest(state) {
            state.loading = true;
        },
        addPlayerSuccess(state, action) {
            state.userName = action.payload.username;
            state.avatar = action.payload.avatar;
            state.loading = false;
        },
        addPlayerFail(state, action) {
            state.error = action.payload.error;
            state.loading = false;
        },
        addRoomRequest: (state, action) => {
            state.loading = true;
        },
        addRoomName: (state, action) => {
            state.roomName = action.payload;
            state.loading = false;
        },
        setAdmin: (state, action) => {
            if (action.payload === 1) state.admin = true;
            else state.admin = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addPlayerRequest,
    addPlayerSuccess,
    addPlayerFail,
    addRoomRequest,
    addRoomName,
    setAdmin,
} = playerSlice.actions;

export default playerSlice.reducer;
