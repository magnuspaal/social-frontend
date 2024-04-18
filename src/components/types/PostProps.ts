import { Post, Reply, Repost } from "@/types/post"

interface BasePost {
  className?: string
  children?: React.ReactNode
  clickablePicture?: boolean
  clickableHeader?: boolean
  clickableReplyHeader?: boolean
}

export interface SinglePostProps extends BasePost {
  post: Post
  clickable?: boolean
  includeReplyHeader?: boolean
  includeRepostHeader?: boolean
  includePostActions?: boolean
  appendRepost?: boolean
  isMe?: boolean
}

export interface RepostPostProps extends BasePost {
  post: Repost
  includeHeader?: boolean
  includePostActions?: boolean
  appendRepost?: boolean
  isMe?: boolean
}

export interface ReplyPostProps extends BasePost {
  post: Reply
  includeReplyHeader?: boolean
}
