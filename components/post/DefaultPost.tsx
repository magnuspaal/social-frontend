import { Post } from "@/types/post";
import { getPostTimestamp } from "@/utils/date-utils";
import PostHeader from "./PostHeader";

export default function ReplyPost({
    post, 
  }: {post: Post}) {

  return (
    <div>
      <PostHeader post={post}></PostHeader>
      <div className="mx-5 whitespace-break-spaces">{post.content}</div>
    </div>
  )
}