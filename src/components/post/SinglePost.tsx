import { Post, Reply, Repost } from "@/types/post";
import PostActions from "./PostActions";
import { SinglePostProps } from "../types/PostProps";
import RepostPost from "./RepostPost";
import ReplyPost from "./ReplyPost";
import DefaultPost from "./DefaultPost";
import { useNavigate } from "react-router-dom";

export default function SinglePost({
  post, 
  clickable = true,
  clickablePicture = true,
  clickableHeader = true,
  clickableReplyHeader = true,
  includeReplyHeader = true,
  includeRepostHeader = true,
  includePostActions = true,
  appendRepost = false,
  isMe = false,
  className = '',
  children
}: SinglePostProps) {

  const repostProps = {appendRepost, includePostActions, includeRepostHeader, isMe, clickableHeader, clickablePicture, className}
  const replyProps = {includeReplyHeader, clickableReplyHeader, clickableHeader, clickablePicture, className}
  const defaultPostProps = {clickableHeader, clickablePicture, className}

  const navigate = useNavigate();

  const renderPost = (post: Post) => {
    if (post.repostParent) {
      return <RepostPost post={post as Repost} includeHeader={includeRepostHeader} {...repostProps}/>
    } else if (post.replyParent) {
      return <ReplyPost post={post as Reply} {...replyProps}/>
    } else {
      return <DefaultPost post={post} {...defaultPostProps}/>
    }
  }

  const getPostActions = () => {
    if (!includePostActions) return
    else return <PostActions appendRepost={appendRepost} post={post} repostPost={isMe && post.repostParent ? post.repostParent : post} />
  }

  const onClick = () => {
    if (clickable) navigate(`/post/${post.id}`)
  }


  const postWrapper = () => 
    <div onClick={onClick} className={`relative bg-background overflow-hidden ${!includePostActions && 'pb-4'}  ${clickable && 'hover:bg-shade cursor-pointer'} flex flex-col h-fit ${className}`}> 
      { children }
      { renderPost(post) }
      { getPostActions() }
    </div>

  const render = () => {
    return clickable ? <div>{ postWrapper() }</div> : postWrapper()
  }

  return render()
}