'use client'

import useClientApiService from "@/services/client-api-service";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addPost, removePost, updatePost } from "@/store/post-slice";
import { Post } from "@/types/post";
import { useRouter } from "next/navigation";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export default function PostActions({ 
  appendRepost = false,
  post,
  repostPost
}: {post: Post, repostPost: Post, appendRepost?: boolean, }) {

  const router = useRouter()
  const dispatch = useAppDispatch();
  const clientApiService = useClientApiService()

  const handleLike = async (event: any) => {
    event.preventDefault()
    const newPost = await clientApiService.likePost(post.id)
    if (newPost) {
      dispatch(updatePost(newPost))
    }
    router.refresh()
  }

  const handleRepost = async (event: any) => {
    event.preventDefault()
    const newPost = await clientApiService.repostPost(repostPost.id)
    if (appendRepost) {
      if (newPost.deletedAt) {
        dispatch(removePost(newPost))
      } else {
        dispatch(addPost(newPost))
      }
    }
    if (newPost.repostParent) {
      dispatch(updatePost(newPost.repostParent))
    }

    router.refresh()
  }

  return (
    <div className="flex flex-row pl-5 pt-4">
      <div className="flex flex-row grid grid-cols-2"> 
        <SwitchTransition mode={'out-in'}>
          <CSSTransition 
            key={post.likeCount}
            timeout={250 * 0.75}
            classNames={{enter: "bounce-enter", appear: "bounce-enter", exit: "bounce-exit"}}
          >
            <div className="flex flex-row">
              <button onClick={handleLike} className={`mr-2 font-bold ${post.liked ? 'font-bold text-tertiary' : ''}`}>Like</button>
              <div>{post.likeCount}</div>
            </div>
          </CSSTransition>
        </SwitchTransition>

        <SwitchTransition mode={'out-in'}>
          <CSSTransition 
            key={repostPost?.repostCount ?? post.repostCount} 
            timeout={250 * 0.75} 
            classNames={{enter: "bounce-enter", appear: "bounce-enter", exit: "bounce-exit"}}
          >
            <div className="flex flex-row">
              <button onClick={handleRepost} className={`mr-2 font-bold ${repostPost?.reposted ?? post.reposted ? 'font-bold text-tertiary' : ''}`}>Repost</button>
              <div>{repostPost?.repostCount ?? post.repostCount}</div>
            </div>
          </CSSTransition> 
        </SwitchTransition>
      </div>
    </div>
  )
}