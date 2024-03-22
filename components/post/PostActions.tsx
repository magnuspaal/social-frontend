'use client'

import useClientApiService from "@/services/client/client-api-service";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addPost, removePost, updatePost } from "@/store/post-slice";
import { Post } from "@/types/post";
import { useRouter } from "next/navigation";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Image from "next/image"
import { setSubmitPostOverlay } from "@/store/navigation-slice";

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

  const handleReply = (event: any) => {
    event.preventDefault()
    dispatch(setSubmitPostOverlay({open: true, replyParent: post}))
  }

  return (
    <div className="flex flex-row px-5 pb-4 w-full">
      <div className="flex flex-row w-full justify-start"> 
        <SwitchTransition mode={'out-in'}>
          <CSSTransition 
            key={post.likeCount}
            timeout={250 * 0.75}
            classNames={{enter: "bounce-enter", appear: "bounce-enter", exit: "bounce-exit"}}
          >
            <div className={`flex flex-row ${post.liked && "post-action-button-active"}`}>
              <button onClick={handleLike} className="flex flex-row items-center">
                <Image src='/heart.svg' width={20} height={20} alt="Like button"/>
                <div className="w-8 ml-2 font-semibold text-start">{post.likeCount}</div>
              </button>
            </div>
          </CSSTransition>
        </SwitchTransition>

        <SwitchTransition mode={'out-in'}>
          <CSSTransition 
            key={repostPost?.repostCount ?? post.repostCount} 
            timeout={250 * 0.75} 
            classNames={{enter: "bounce-enter", appear: "bounce-enter", exit: "bounce-exit"}}
          >
            <div className={`flex flex-row ${(repostPost?.reposted ?? post.reposted) && "post-action-button-active"}`}>
              <button onClick={handleRepost} className="flex flex-row items-center">
                <Image src='/repost.svg' width={20} height={20} alt="Repost button"/>
                <div className="w-8 ml-2 font-semibold text-start">{repostPost?.repostCount ?? post.repostCount}</div>
              </button>
            </div>
          </CSSTransition> 
        </SwitchTransition>

        <SwitchTransition mode={'out-in'}>
          <CSSTransition 
            key={repostPost?.replyCount ?? post.replyCount} 
            timeout={250 * 0.75} 
            classNames={{enter: "bounce-enter", appear: "bounce-enter", exit: "bounce-exit"}}
          >
            <div className={`flex flex-row`}>
              <button onClick={handleReply} className="flex flex-row items-center">
                <Image src='/reply.svg' width={20} height={20} alt="Reply button"/>
                <div className="w-8 ml-2 font-semibold text-start">{repostPost?.replyCount ?? post.replyCount}</div>
              </button>
            </div>
          </CSSTransition> 
        </SwitchTransition>
      </div>
    </div>
  )
}