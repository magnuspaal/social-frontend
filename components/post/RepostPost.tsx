import { RepostPostProps } from "../types/PostProps";
import SinglePost from "./SinglePost";
import PostHeader from "./header/PostHeader";

export default function RepostPost({
    post,
    includeHeader = false,
    appendRepost = false,
    isMe = false
  }: RepostPostProps) {

  return (
    <div>
      <div className={`text-sm font-normal pt-4 pl-4 ${!includeHeader && 'pb-4'}`}>Reposted by {isMe ? 'you' : post.user.username}</div>
      {includeHeader && <PostHeader post={post}></PostHeader>}
      <div className="border rounded border-black/40 mx-4 mb-1 overflow-hidden">
        <SinglePost post={post.repostParent} clickable={false} includePostActions={false} appendRepost={appendRepost} />
      </div>
    </div>
  )
}