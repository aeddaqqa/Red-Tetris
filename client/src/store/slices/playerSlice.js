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
        stages: [],
        admin: null,
        adminError: null,
        gameEnd: null,
        gameOver: null,
        tetros: [],
        wall: false,
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
        joinRoomRequest: (state, action) => {
            state.loading = true;
        },
        sendMessage: (state) => {
            state.chat = [...state.chat];
        },
        ShiftTetros: (state) => {
            state.tetros.shift();
        },
        addWallRequest: (action) => {},
        sendStage: (action) => {},
        newTetrosRequest: (state) => {},
        startTheGameRequest: (state) => {
            state.gameEnd = null;
            state.gameOver = null;
            state.adminError = null;
            state.tetros = [];
        },
        addToChat: (state, action) => {
            state.chat = [...state.chat, action.payload];
        },
        setAdminError: (state, action) => {
            state.adminError = true;
        },
        startTheGame: (state, action) => {
            state.gameEnd = false;
            state.gameOver = false;
            state.tetros = action.payload;
            state.adminError = null;
        },
        concatTetros: (state, action) => {
            console.log(action.payload);
            let newTetros = [];
            state.tetros = newTetros.concat(state.tetros, action.payload);
        },
        setStage: (state, action) => {
            // console.log("in adding action",action.payload)
            if (!state.stages.length) {
                state.stages.push(action.payload);
            } else {
                let Stg = state.stages.filter(
                    (stg) => stg.username === action.payload.username
                );
                if (Stg[0]?.username) Stg[0].stage = action.payload.stage;
                else {
                    state.stages.push(action.payload);
                    // socket.emit("checkStages", { Stages, stage, room: roomname });
                }
            }
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
    joinRoomRequest,
    sendMessage,
    ShiftTetros,
    addWallRequest,
    sendStage,
    newTetrosRequest,
    startTheGameRequest,
    addToChat,
    setAdminError,
    startTheGame,
    concatTetros,
    setStage,
} = playerSlice.actions;

export default playerSlice.reducer;
