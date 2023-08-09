'use client'

import { Post } from "@/types/post";
import { useRouter } from "next/navigation";

export default function PostName({post}: {post: Post}) {

  const router = useRouter()

  const handleClick = (event: any) => {
    event.preventDefault()
    router.push(`/profile/${post.user.id}`)
  }

  return (
    <div onClick={handleClick} className="font-bold text-lg mr-2 hover:underline hover:cursor-pointer">{post.user.username}</div>
  )
}