'use client'

import { getPostTimestamp } from "@/utils/date-utils";
import { Post } from "@/types/post";
import Image from "next/image";
import PostName from "./PostName";
import { getImageAddress } from "@/utils/image-utils";

export default function PostHeader({post}: {post: Post}) {

  return (
    <div className="flex flex-row p-4 items-start">
      <Image
        src={post.user.imageName ? getImageAddress(post.user.imageName) : "/blank-profile-picture.svg"} 
        alt="Profile picture"
        height={50}
        width={50}
        className="mr-3"
      />
      <PostName post={post} />
      <div className="italic text-sm font-normal py-[4px]">{getPostTimestamp(post.createdAt)}</div>
    </div>
  )
}