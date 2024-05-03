import { User } from "../../user"
import { ChatImage } from "./chat-image"
import { MessageReaction } from "./message-reaction"

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
  chatImage: ChatImage
  messageReactions: MessageReaction[]

  options?: {
    animate?: boolean
  }
}

export type TextChatMessage = Omit<ChatMessage, "chatImage">

export type ActiveChatMessage = Pick<ChatMessage, "sender" | "owner" | "type"> 

export type ImageChatMessage = Omit<ChatMessage, "content"> 

export type ReactionChatMessage = Omit<ChatMessage, "messageReactions" | "chatImage" | "deletedAt" | "owner"> 