

import { Post } from "@/types/post";
import PostHeader from "./header/PostHeader";
import { getImageAddress } from "@/utils/image-utils";
import { useAppDispatch } from "@/store/hooks";
import { setOverlayImage } from "@/store/navigation-slice";
import { MouseEventHandler } from "react";

export default function DefaultPost({
    post, 
    clickablePicture = true,
    clickableHeader = true,
  }: {post: Post, clickablePicture?: boolean, clickableHeader?: boolean, className?: string}) {

  const dispatch = useAppDispatch()

  const showImageOverlay: MouseEventHandler<HTMLDivElement> = (event) => {
    if (clickablePicture) {
      event.preventDefault()
      event.stopPropagation()
      dispatch(setOverlayImage(post.imageName));
    }
  }

  const renderImage = (imageName: string) => {
    if (imageName) {
      const ratio = Number(imageName.split('.')[0].split('-')[1])

      return (
        <div onClick={showImageOverlay} className="flex rounded-lg overflow-hidden mx-8 mt-1 mb-4 h-full">
          <img
            src={getImageAddress(imageName)} 
            alt="Post image"
            width={558}
            height={558 / (ratio / 100000)}
            className={`w-full h-full object-cover ${clickablePicture && 'hover:opacity-90'}`}
          />
        </div>
      )
    }
  }

  return (
    <div className={`flex flex-col h-full`}>
      <PostHeader post={post} clickable={clickableHeader}>
        <div className="whitespace-break-spaces">{post.content}</div>
      </PostHeader>
      { renderImage(post.imageName) }
    </div>
  )
}