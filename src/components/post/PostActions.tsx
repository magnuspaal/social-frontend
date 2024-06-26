

import useApiService from "@/services/api-service";
import { useAppDispatch } from "@/store/hooks";
import { addPost, removePost, updatePost } from "@/store/post-slice";
import { Post } from "@/types/post";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { setSubmitPostOverlay } from "@/store/navigation-slice";
import RepostSvg from "../svg/RepostSvg";
import ReplySvg from "../svg/ReplySvg";
import HeartSvg from "../svg/HeartSvg";
import { colors } from "@/style/colors"
import { MouseEventHandler } from "react";

export default function PostActions({ 
  appendRepost = false,
  post,
  repostPost
}: {post: Post, repostPost: Post, appendRepost?: boolean, }) {

  const dispatch = useAppDispatch();
  const apiService = useApiService()

  const handleLike: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    const newPost = await apiService.likePost(post.id)
    if (newPost) {
      dispatch(updatePost(newPost))
    }
  }

  const handleRepost: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    const newPost = await apiService.repostPost(repostPost.id)
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
  }

  const handleReply: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
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
            <div className={`flex flex-row`}>
              <button onClick={handleLike} className="flex flex-row items-center">
                <HeartSvg size={20} color={`${post.liked ? colors.tertiary : colors.black}`}/>
                <div className={`w-8 ml-2 font-semibold text-start ${post.liked && "text-tertiary"}`}>
                  {post.likeCount}
                </div>
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
            <div className={`flex flex-row`}>
              <button onClick={handleRepost} className="flex flex-row items-center">
                <RepostSvg size={20} color={`${(post.reposted) ? colors.tertiary : colors.black}`}/>
                <div className={`w-8 ml-2 font-semibold text-start ${(post.reposted) && "text-tertiary"}`}>
                  {post.repostCount}
                </div>
              </button>
            </div>
          </CSSTransition> 
        </SwitchTransition>

        <SwitchTransition mode={'out-in'}>
          <CSSTransition 
            key={post.replyCount} 
            timeout={250 * 0.75} 
            classNames={{enter: "bounce-enter", appear: "bounce-enter", exit: "bounce-exit"}}
          >
            <div className={`flex flex-row`}>
              <button onClick={handleReply} className="flex flex-row items-center">
                <ReplySvg size={18} />
                <div className="w-8 ml-2 font-semibold text-start">{post.replyCount}</div>
              </button>
            </div>
          </CSSTransition> 
        </SwitchTransition>
      </div>
    </div>
  )
}