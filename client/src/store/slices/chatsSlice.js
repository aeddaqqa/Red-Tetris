import { createSlice } from "@reduxjs/toolkit";

const ChatEvent = {
    SendMessage: "send_message",
    RequestAllMessages: "request_all_messages",
    SendAllMessages: "send_all_messages",
    ReceiveMessage: "receive_message",
};

const initialState = {
    connected: false,
    connecting: false,
    messages: [],
};

const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        startConnecting(state) {
            state.connecting = true;
        },
        isConnected(state) {
            state.connected = true;
        },
        receiveAllMessages(state, action) {
            state.messages = action;
        },
        reciveMessage(state, action) {
            state.messages = [...state.messages, action];
        },
        submitMessage(state) {
            return;
        },
    },
});

export const {
    startConnecting,
    isConnected,
    receiveAllMessages,
    reciveMessage,
    submitMessage,
} = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
