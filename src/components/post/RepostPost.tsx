

import useTranslation from "@/lang/use-translation";
import { RepostPostProps } from "../types/PostProps";
import SinglePost from "./SinglePost";
import PostHeader from "./header/PostHeader";
import RepostSvg from "../svg/RepostSvg";


export default function RepostPost({
    post,
    appendRepost = false,
    clickablePicture = true,
    clickableHeader = true,
    clickableReplyHeader = true
  }: RepostPostProps) {

  const { t } = useTranslation()

  const singlePostProps = {clickablePicture, clickableHeader, clickableReplyHeader}

  return (
    <div>
      <PostHeader post={post}> 
        <div className={`text-xs font-normal flex flex-row mt-1 gap-1`}>
          <RepostSvg size={15} />
          {t('post.reposted_by')}
        </div>
      </PostHeader>
      <div className="border rounded-lg border-black/40 mx-4 mb-4 overflow-hidden flex flex-col">
        <SinglePost post={post.repostParent} clickable={false} includePostActions={false} appendRepost={appendRepost} {...singlePostProps} className="pb-0"/>
      </div>
    </div>
  )
}