'use client'

import { useRouter } from "next/navigation";
import { ReplyPostProps } from "../types/PostProps";
import PostHeader from "./PostHeader";

export default function ReplyPost({
    post, 
    includeReplyHeader = true,
  }: ReplyPostProps) {

  const router = useRouter()

  const handleClick = (event: any) => {
    event.preventDefault()
    router.push(`/post/${post.replyParent.id}`)
  }

  return (
    <div>
      {includeReplyHeader && <div className="pt-4 pl-4"><div onClick={handleClick} className="text-sm font-normal hover:underline hover:cursor-pointer">reply to {post.replyParent.user.username}</div></div>}
      <PostHeader post={post}></PostHeader>
      <div className="mx-5 whitespace-break-spaces">{post.content}</div>
    </div>
  )
}