import { createSlice } from "@reduxjs/toolkit";

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
    },
});

// Action creators are generated for each case reducer function
export const { addPlayerRequest, addPlayerSuccess, addPlayerFail } =
    playerSlice.actions;

export default playerSlice.reducer;
