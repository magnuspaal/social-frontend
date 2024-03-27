import { Chat } from "../chat"
import { User } from "../user"

export interface ChatMessage {
  createdAt: string
  deletedAt: string
  id: number
  chatMessageId: number
  content: string
  type: string
  sender: User
  owner: User
  chatId: number
}