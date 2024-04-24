import { Chat } from "@/types/chat";
import { ChatMessage } from "@/types/chat/chat-message";
import { User } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

export const messagingSlice = createSlice({
  name: 'messaging',
  initialState: {
    messages: [],
    writingMessage: {},
    chat: undefined,
    activeUsers: []
  } as {
    messages: ChatMessage[],
    writingMessage: {[chatId: number] : User[] | undefined},
    chat?: Chat,
    activeUsers: number[]
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
    },
    setChat: (state, action: {payload: Chat, type: string}) => {
      state.chat = action.payload
    },
    removeChat: (state) => {
      state.chat = undefined
    },
    updateSeenMessages: (state, action: {payload: {messageId: number, chatId: number, senderId: number}, type: string}) => {
      const {messageId, chatId, senderId} = action.payload
      if (state.chat?.id == chatId) {
        state.chat.chatUsers = state.chat.chatUsers.map((chatUser) => {
          if (chatUser.user.id == senderId) {
            chatUser.latestSeenMessage = messageId
          }
          return chatUser
        })
      }
    },
    addActiveUser: (state, action: {payload: User, type: string}) => {
      const user = action.payload
      const activeUser = state.activeUsers.find((activeUser) => activeUser == user.id)
      if (!activeUser) {
        state.activeUsers.push(user.id)
      }
    },
    removeActiveUser: (state, action: {payload: User, type: string}) => {
      const user = action.payload
      state.activeUsers = state.activeUsers.filter((activeUser) => activeUser != user.id)
    }
  }
})

export const { 
  addMessage, 
  addMessages, 
  clearAllMessages, 
  setWritingMessage, 
  clearWritingMessage, 
  setChat, 
  updateSeenMessages, 
  removeChat,
  addActiveUser,
  removeActiveUser
} = messagingSlice.actions

export default messagingSlice.reducer