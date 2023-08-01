import { Post, Reply, Repost } from "@/types/post"

export interface SinglePostProps {
  post: Post
  clickable?: boolean
  includeReplyHeader?: boolean
  includeRepostHeader?: boolean
  includePostActions?: boolean
  appendRepost?: boolean
  isMe?: boolean
}

export interface RepostPostProps {
  post: Repost
  includeHeader?: boolean
  includePostActions?: boolean
  appendRepost?: boolean
  isMe?: boolean
}

export interface ReplyPostProps {
  post: Reply
  includeReplyHeader?: boolean
}
