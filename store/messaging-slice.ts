import { ChatMessage } from "@/types/chat-message";
import { createSlice } from "@reduxjs/toolkit";

export const messagingSlice = createSlice({
  name: 'messaging',
  initialState: {
    messages: {},
  } as {
    messages: {[id: string]: ChatMessage[]}
  },
  reducers: {
    addMessage: (state, action: {payload: ChatMessage, type: string}) => {
      if (!state.messages[action.payload.chatId]) {
        state.messages[action.payload.chatId] = []
      }
      state.messages[action.payload.chatId].unshift(action.payload)
    },
    addMessages: (state, action: {payload: ChatMessage[], type: string}) => {
      const chatId = action.payload[0].chatId
      if (!state.messages[action.payload[0].chatId]) {
        state.messages[action.payload[0].chatId] = []
      }
      const filteredMessages = action.payload.filter((payloadMessage) => !state.messages[chatId].find((message) => payloadMessage.id == message.id))
      state.messages[chatId].push(...filteredMessages)
    },
    clearAllMessages: (state) => {
      state.messages = {}
    }
  }
})

export const { addMessage, addMessages, clearAllMessages } = messagingSlice.actions

export default messagingSlice.reducer