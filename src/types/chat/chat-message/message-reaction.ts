import { User } from "@/types/user"

export interface MessageReaction {
  createdAt: string
  id: number
  reaction: string
  user: User
}