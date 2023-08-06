'use client'

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { User } from "@/types/user";
import SinglePost from "../post/SinglePost";
import usePostInfiniteScroll from "@/hooks/use-infinite-scroll";
import useClientApiService from "@/services/client-api-service";
import { Post } from "@/types/post";

export default function UserPostList({ userId, me }: { userId: number, me: User }) {

  const isMe = () => me.id == userId

  const clientApiService = useClientApiService()

  const {posts, endOfPosts} = usePostInfiniteScroll(clientApiService.getUserPosts, {userId})

  return (
    <div className="border border-black/40 rounded max-w-2xl">
      <TransitionGroup className="grid divide-y divide-black/40">
        {posts?.map((post: Post) => 
          <CSSTransition
            key={post.id}
            timeout={2000}
            classNames='post'
          >
            <SinglePost appendRepost={isMe()} isMe={isMe()} key={post.id} post={post} includeRepostHeader={false}/>
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