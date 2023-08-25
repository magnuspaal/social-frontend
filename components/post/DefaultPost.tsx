'use client'

import { Post } from "@/types/post";
import PostHeader from "./header/PostHeader";
import Image from "next/image";
import { getImageAddress } from "@/utils/image-utils";
import { useAppDispatch } from "@/store/hooks";
import { setOverlayImage } from "@/store/navigation-slice";

export default function DefaultPost({
    dict,
    post, 
    clickablePicture = true,
    clickableHeader = true,
    className = ''
  }: {dict: any, post: Post, clickablePicture?: boolean, clickableHeader?: boolean, className?: string}) {

  const dispatch = useAppDispatch()

  const showImageOverlay = (event: any) => {
    if (clickablePicture) {
      event.preventDefault()
      dispatch(setOverlayImage(post.imageName));
    }
  }

  const renderImage = (imageName: string) => {
    if (imageName) {
      const ratio = Number(imageName.split('.')[0].split('-')[1])

      return (
        <div onClick={showImageOverlay} className="flex rounded-lg overflow-hidden mx-8 mt-1 mb-4 h-full">
          <Image 
            src={getImageAddress(imageName)} 
            alt="Post image"
            width={558}
            height={558 / (ratio / 100000)}
            quality={100}
            className={`w-full h-full object-cover ${clickablePicture && 'hover:opacity-90'}`}
          />
        </div>
      )
    }
  }

  return (
    <div className={`flex flex-col h-full`}>
      <PostHeader dict={dict} post={post} clickable={clickableHeader}>
        <div className="whitespace-break-spaces">{post.content}</div>
      </PostHeader>
      { renderImage(post.imageName) }
    </div>
  )
}