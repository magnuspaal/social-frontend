'use client'

import useTranslation from "@/lang/use-translation";
import { RepostPostProps } from "../types/PostProps";
import SinglePost from "./SinglePost";
import PostHeader from "./header/PostHeader";
import Image from 'next/image'

export default function RepostPost({
    post,
    includeHeader = false,
    appendRepost = false,
    isMe = false,
    clickablePicture = true,
    clickableHeader = true,
    clickableReplyHeader = true
  }: RepostPostProps) {

  const { t } = useTranslation()

  const singlePostProps = {clickablePicture, clickableHeader, clickableReplyHeader}

  return (
    <div>
      <PostHeader post={post}> 
        <div className={`text-xs font-normal flex flex-row mt-1`}>
          <Image src='/repost.svg' width={15} height={15} alt="Repost icon" className="mr-1" quality={100}/>
          {t('post.reposted_by')}
        </div>
      </PostHeader>
      <div className="border rounded-lg border-black/40 mx-4 mb-4 overflow-hidden flex flex-col">
        <SinglePost post={post.repostParent} clickable={false} includePostActions={false} appendRepost={appendRepost} {...singlePostProps} className="pb-0"/>
      </div>
    </div>
  )
}