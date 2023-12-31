'use client'

import { CSSTransition, TransitionGroup } from "react-transition-group";
import SinglePost from "../post/SinglePost";
import usePostInfiniteScroll from "@/hooks/use-infinite-scroll";
import useClientApiService from "@/services/client-api-service";

export default function Feed({dict}: any) {

  const clientApiService = useClientApiService()

  const {posts, endOfPosts} = usePostInfiniteScroll(clientApiService.getFeed)

  return (
    <div className="border border-black/40 rounded overflow-hidden">
      <TransitionGroup className="grid divide-y divide-black/40">        
        {posts?.map((post: any) => 
          <CSSTransition
          key={post.id}
          timeout={2000}
          classNames='post'>
            <SinglePost dict={dict} key={post.id} post={post} includeRepostHeader={false} />
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