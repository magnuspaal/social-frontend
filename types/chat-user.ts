import { SeenMessagesRanges } from "./seen-messages-ranges"
import { User } from "./user"

export interface ChatUser {
  id: number,
  user: User,
  seenMessagesRanges: SeenMessagesRanges[],
  latestSeenMessage: number
}