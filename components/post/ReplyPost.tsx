'use client'

import { useRouter } from "next/navigation";
import { ReplyPostProps } from "../types/PostProps";
import PostHeader from "./header/PostHeader";
import Image from 'next/image'

export default function ReplyPost({
    dict,
    post, 
    includeReplyHeader = true,
    clickablePicture = true,
    clickableHeader = true,
    clickableReplyHeader = true
  }: ReplyPostProps) {

  const router = useRouter()

  const handleClick = (event: any) => {
    if (clickableReplyHeader) {
      event.preventDefault()
      router.push(`/post/${post.replyParent.id}`)
    }
  }

  return (
    <div>
      {includeReplyHeader && 
      <div className="pt-4 pl-4 flex flex-row">
        <Image src='/reply.svg' width={13} height={13} alt="Reply icon" className="mr-1" quality={100}/>
        <div onClick={handleClick} className={`text-xs font-normal ${clickableReplyHeader && 'hover:underline hover:cursor-pointer'}`}>
          {dict.post.reply_to} <span className="font-bold">{post.replyParent.user.username}</span>
        </div>
      </div>}
      <PostHeader dict={dict} post={post} clickable={clickableHeader}>
        <div className="whitespace-break-spaces">{post.content}</div>
      </PostHeader>
    </div>
  )
}