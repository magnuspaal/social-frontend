import { ChatMessage } from "@/types/chat-message";
import { createSlice } from "@reduxjs/toolkit";

export const messagingSlice = createSlice({
  name: 'messaging',
  initialState: {
    messages: []
  } as {
    messages: ChatMessage[]
  },
  reducers: {
    addMessage: (state, action: {payload: ChatMessage, type: string}) => {
      state.messages.unshift(action.payload)
    },
    addMessages: (state, action: {payload: ChatMessage[], type: string}) => {
      const filteredMessages = action.payload.filter((payloadMessage) => !state.messages.find((message) => payloadMessage.id == message.id))
      state.messages.push(...filteredMessages)
    },
    clearAllMessages: (state) => {
      state.messages = []
    }
  }
})

export const { addMessage, addMessages, clearAllMessages } = messagingSlice.actions

export default messagingSlice.reducer