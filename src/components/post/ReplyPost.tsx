

import { useNavigate } from "react-router-dom";
import ReplySvg from "../svg/ReplySvg";
import { ReplyPostProps } from "../types/PostProps";
import PostHeader from "./header/PostHeader";

import useTranslation from "@/lang/use-translation";

export default function ReplyPost({
    post, 
    includeReplyHeader = true,
    clickableHeader = true,
    clickableReplyHeader = true
  }: ReplyPostProps) {

  const { t } = useTranslation()

  const navigate = useNavigate()

  const handleClick = (event: any) => {
    if (clickableReplyHeader) {
      event.preventDefault()
      navigate(`/post/${post.replyParent.id}`)
    }
  }

  return (
    <div>
      {includeReplyHeader && 
      <div className="pt-4 pl-4 flex flex-row gap-1">
        <ReplySvg size={13} />
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