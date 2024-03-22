'use client'

import { useRouter } from "next/navigation";
import { ReplyPostProps } from "../types/PostProps";
import PostHeader from "./header/PostHeader";
import Image from 'next/image'
import useTranslation from "@/lang/use-translation";

export default function ReplyPost({
    post, 
    includeReplyHeader = true,
    clickablePicture = true,
    clickableHeader = true,
    clickableReplyHeader = true
  }: ReplyPostProps) {

  const { t } = useTranslation()
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
          {t('post.reply_to')} <span className="font-bold">{post.replyParent.user.username}</span>
        </div>
      </div>}
      <PostHeader post={post} clickable={clickableHeader}>
        <div className="whitespace-break-spaces">{post.content}</div>
      </PostHeader>
    </div>
  )
}