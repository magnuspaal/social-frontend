'use client'

import { getPostTimestamp } from "@/utils/date-utils";
import { Post } from "@/types/post";
import Image from "next/image";
import { ImageSize, getImageAddress } from "@/utils/image-utils";
import { useRouter } from "next/navigation";

export default function PostHeader({dict, post, children, clickable = true}: {dict: any, post: Post, children?: React.ReactNode, clickable?: boolean}) {

  const router = useRouter()

  const handleClick = (event: any) => {
    if (clickable) {
      event.preventDefault()
      router.push(`/profile/${post.user.id}`)
    }
  }

  return (
    <div className="flex flex-row p-4 items-start">
      <Image
        src={post.user.imageName ? getImageAddress(post.user.imageName, ImageSize.XS) : "/blank-profile-picture.svg"} 
        alt="Profile picture"
        height={50}
        width={50}
        quality={100}
        className="mr-3"
      />
      <div>
        <div className="flex">
          <div onClick={handleClick} className={`font-bold text-lg mr-2 ${clickable && 'hover:underline hover:cursor-pointer'}`}>{post.user.username}</div>
          <div className="italic text-sm font-normal py-[4px]">{getPostTimestamp(post.createdAt, dict.post.now)}</div>
        </div>
        {children}
      </div>
    </div>
  )
}