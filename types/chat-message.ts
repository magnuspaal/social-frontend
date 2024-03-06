import { Chat } from "./chat"
import { User } from "./user"

export interface ChatMessage {
  createdAt: number
  deletedAt: string
  id: number
  content: string
  user: User
  chat: Chat
}