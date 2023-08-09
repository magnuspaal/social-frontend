import { Post, Reply, Repost } from "@/types/post";
import PostActions from "./PostActions";
import Link from "next/link";
import { SinglePostProps } from "../types/PostProps";
import RepostPost from "./RepostPost";
import ReplyPost from "./ReplyPost";
import DefaultPost from "./DefaultPost";

export default function SinglePost({
  post, 
  clickable = true,
  includeReplyHeader = true,
  includeRepostHeader = true,
  includePostActions = true,
  appendRepost = false,
  isMe = false
}: SinglePostProps) {

  const renderPost = (post: Post) => {
    if (post.repostParent) {
      return <RepostPost post={post as Repost} appendRepost={appendRepost} includePostActions={includePostActions} includeHeader={includeRepostHeader} isMe={isMe}/>
    } else if (post.replyParent) {
      return <ReplyPost post={post as Reply} includeReplyHeader={includeReplyHeader} />
    } else {
      return <DefaultPost post={post} />
    }
  }

  const getPostActions = () => {
    if (!includePostActions) return
    else return <PostActions appendRepost={appendRepost} post={post} repostPost={isMe && post.repostParent ? post.repostParent : post} />
  }


  const postWrapper = () => 
    <div className={`bg-background overflow-hidden ${!includePostActions && 'pb-4'} ${clickable && 'hover:bg-shade cursor-pointer'}`}> 
      { renderPost(post) }
      { getPostActions() }
    </div>

  const render = () => {
    return clickable ? <Link href={`/post/${post.id}`}>{ postWrapper() }</Link> : postWrapper()
  }

  return render()
}