import { Post } from "@/types/post";
import PostHeader from "./header/PostHeader";
import Image from "next/image";
import { getImageAddress } from "@/utils/image-utils";

export default function ReplyPost({
    post, 
  }: {post: Post}) {

  const renderImage = (imageName: string) => {
    if (imageName) {
      return (
        <div className="mt-8 mx-5">
          <Image 
            src={getImageAddress(imageName)} 
            alt={`post-${post.id}-image`} 
            width={2000}
            height={2000}
            className="rounded-lg"
          />
        </div>
      )
    }
  }

  return (
    <div>
      <PostHeader post={post}></PostHeader>
      <div className="mx-5 whitespace-break-spaces">{post.content}</div>
      { renderImage(post.imageName) }
    </div>
  )
}