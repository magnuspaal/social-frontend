'use client'
import { getPostTimestamp } from "@/utils/date-utils";
import { Post } from "@/types/post";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";

export default function RepostPost({post}: {post: Post}) {

  const router = useRouter()

  const handleClick = (event: any) => {
    event.preventDefault()
    router.push(`/profile/${post.user.id}`)
  }

  const imageApiUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL

  return (
    <div className="flex flex-row p-4 items-start">
      <Image 
        src={post.user.imageName ? `${imageApiUrl}/${post.user.imageName}` : `/blank-profile-picture.png`} 
        alt="Profile picture"
        height={50}
        width={50}
        className="mr-3"
      />
      <div onClick={handleClick} className="font-bold text-lg mr-2 hover:underline hover:cursor-pointer">{post.user.username}</div>
      <div className="italic text-sm font-normal py-[4px]">{getPostTimestamp(post.createdAt)}</div>
    </div>
  )
}