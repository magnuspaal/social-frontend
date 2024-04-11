import { Chat } from "@/types/chat";
import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: []
  } as {
    chats: Chat[]
  },
  reducers: {
    addChat: (state, action: {payload: Chat, type: string}) => {
      state.chats.push(action.payload)
    },
    addChats: (state, action: {payload: Chat[], type: string}) => {
      const filteredChats = action.payload.filter((payloadChat) => !state.chats.find((chat) => chat.id == payloadChat.id))
      state.chats.push(...filteredChats)
    },
    updateChat: (state, action: {payload: Chat, type: string}) => {
      const chatExists = state.chats.some((chat) => chat.id == action.payload.id)
      if (chatExists) {
        state.chats = state.chats.map((chat) => {
          if (action.payload.id == chat.id) {
            return action.payload;
          } else {
            return chat;
          }
        })
      } else {
        state.chats.push(action.payload)
      }
    },
    updateSeenMessage: (state, action: {payload: {chatId: number, messageId: number, userId: number}, type: string}) => {
      const chat = state.chats.find((chat) => chat.id == action.payload.chatId)
      if (chat) {
        const user = chat.chatUsers.find((user) => user.user.id == action.payload.userId)
        if (user) {
          user.latestSeenMessage = action.payload.messageId
        }
        const index = state.chats.findIndex((foundChat) => foundChat.id == chat?.id)
        state.chats[index] = chat;
      }
    }
  }
})

export const { addChat, addChats, updateChat, updateSeenMessage } = chatSlice.actions

export default chatSlice.reducer