import { ChatMessage } from "./chat-message"
import { User } from "./user"

export interface Chat {
  createdAt: number
  deletedAt: string
  id: number
  users: User[]
  latestMessage?: ChatMessage
}