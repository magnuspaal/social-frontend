

import { CSSTransition, TransitionGroup } from "react-transition-group";
import SinglePost from "../post/SinglePost";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import useApiService from "@/services/api-service";
import { Post } from "@/types/post";
import { addPosts, clearPosts } from "@/store/post-slice";
import { useContext } from "react";
import { MeContext } from "@/providers/me-provider";

export default function UserPostList({ userId }: { userId: number }) {

  const { me } = useContext(MeContext)
  const isMe = () => me?.id == userId

  const apiService = useApiService()

  const [posts, endOfPosts] = useInfiniteScroll(
    apiService.getUserPosts, 
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