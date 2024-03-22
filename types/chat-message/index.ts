import { Chat } from "../chat"
import { User } from "../user"

export interface ChatMessage {
  createdAt: number
  deletedAt: string
  id: number
  content: string
  type: string
  sender: User
  owner: User
  chat: Chat
}