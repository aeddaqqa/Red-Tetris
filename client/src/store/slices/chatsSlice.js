import { createSlice } from "@reduxjs/toolkit";

const ChatEvent = {
    SendMessage: "send_message",
    RequestAllMessages: "request_all_messages",
    ReceiveMessage: "receive_message",
};

const initialState = {
    messages: [],
};

const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
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

export const { receiveAllMessages, reciveMessage, submitMessage } =
    chatSlice.actions;
export const chatsReducer = chatSlice.reducer;
