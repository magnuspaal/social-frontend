import { ChatMessage } from "@/types/chat-message";
import { createSlice } from "@reduxjs/toolkit";

export const messagingSlice = createSlice({
  name: 'messaging',
  initialState: {
    messages: {},
  } as {
    messages: {[id: string]: ChatMessage[]},
  },
  reducers: {
    addMessage: (state, action: {payload: ChatMessage, type: string}) => {
      state.messages[action.payload.chat.id].unshift(action.payload)
    },
    addMessages: (state, action: {payload: ChatMessage[], type: string}) => {
      const chatId = action.payload[0].chat.id
      const filteredMessages = action.payload.filter((payloadMessage) => !state.messages[chatId].find((message) => payloadMessage.id == message.id))
      state.messages[chatId].push(...filteredMessages)
    },
    initChatMessages: (state, action: {payload: number, type: string}) => {
      state.messages[action.payload] = []
    }
  }
})

export const { addMessage, addMessages, initChatMessages } = messagingSlice.actions

export default messagingSlice.reducer