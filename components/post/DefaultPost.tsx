'use client'

import { Post } from "@/types/post";
import PostHeader from "./header/PostHeader";
import Image from "next/image";
import { getImageAddress } from "@/utils/image-utils";
import { useAppDispatch } from "@/store/hooks";
import { setOverlayImage } from "@/store/navigation-slice";

export default function ReplyPost({
    post, 
  }: {post: Post}) {

  const dispatch = useAppDispatch()

  const showImageOverlay = (event: any) => {
    event.preventDefault()
    dispatch(setOverlayImage(post.imageName));
  }

  const renderImage = (imageName: string) => {
    if (imageName) {
      const ratio = Number(imageName.split('.')[0].split('-')[1])

      return (
        <div onClick={showImageOverlay} className="mt-8 mx-5">
          <Image 
            src={getImageAddress(imageName)} 
            alt={`post-${post.id}-image`} 
            width={558}
            height={558 / (ratio / 100000)}
            className="rounded-lg w-full hover:opacity-90 w-auto h-auto w-"
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