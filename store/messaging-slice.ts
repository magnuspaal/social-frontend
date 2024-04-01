import { ChatMessage } from "@/types/chat-message";
import { User } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

export const messagingSlice = createSlice({
  name: 'messaging',
  initialState: {
    messages: [],
    writingMessage: {}
  } as {
    messages: ChatMessage[],
    writingMessage: {[chatId: number] : User[] | undefined}
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
    },
    setWritingMessage: (state, action: {payload: {chatId: number, sender: User}, type: string}) => {
      if (!state.writingMessage[action.payload.chatId]) {
        state.writingMessage[action.payload.chatId] = []
      }
      if (!state.writingMessage[action.payload.chatId]?.find((user) => user.id == action.payload.sender.id)) {
        state.writingMessage[action.payload.chatId]!.push(action.payload.sender)
      }
    },
    clearWritingMessage: (state, action: {payload: {chatId: number, sender: User}, type: string}) => {
      const array = state.writingMessage[action.payload.chatId]
      if (array) {
        state.writingMessage[action.payload.chatId] = array?.filter((user) => user.id !== action.payload.sender.id)
      }
    }
  }
})

export const { addMessage, addMessages, clearAllMessages, setWritingMessage, clearWritingMessage } = messagingSlice.actions

export default messagingSlice.reducer