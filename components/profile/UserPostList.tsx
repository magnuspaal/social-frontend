'use client'

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { User } from "@/types/user";
import SinglePost from "../post/SinglePost";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import useClientApiService from "@/services/client-api-service";
import { Post } from "@/types/post";
import { addPosts, clearPosts } from "@/store/post-slice";

export default function UserPostList({ dict, userId, me }: { dict: any, userId: number, me: User }) {

  const isMe = () => me.id == userId

  const clientApiService = useClientApiService()

  const [posts, endOfPosts] = useInfiniteScroll(
    clientApiService.getUserPosts, 
    (state) => state.post.posts,
    addPosts,
    clearPosts,
    undefined,
    {id: userId})

  return (
    <div className="border-t border-black/40 overflow-hidden">
      <TransitionGroup className="grid divide-y divide-black/40">
        {posts?.map((post: Post) => 
          <CSSTransition
            key={post.id}
            timeout={2000}
            classNames='post'
          >
            <SinglePost dict={dict} appendRepost={isMe()} isMe={isMe()} key={post.id} post={post} includeRepostHeader={false}/>
          </CSSTransition>
        )}
      </TransitionGroup>
      { !endOfPosts &&
        <div className="flex justify-center p-6"> 
          <span className="loader"></span>
        </div>
      }
    </div>
  )
}