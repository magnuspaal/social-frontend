import { ChatMessage } from "./chat-message"
import { ChatSettings } from "./chat-settings"
import { ChatUser } from "./chat-user"

export interface Chat {
  createdAt: number
  deletedAt: string
  id: number
  chatUsers: ChatUser[],
  latestMessage?: ChatMessage,
  chatSettings: ChatSettings
}