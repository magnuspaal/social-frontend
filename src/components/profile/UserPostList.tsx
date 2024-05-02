

import { CSSTransition, TransitionGroup } from "react-transition-group";
import SinglePost from "../post/SinglePost";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import useApiService from "@/services/api-service";
import { Post } from "@/types/post";
import { addPosts, clearPosts } from "@/store/post-slice";
import { useContext} from "react";
import { MeContext } from "@/providers/me-provider";
import { useParams } from "react-router-dom";

export default function UserPostList({ userId }: { userId: number }) {

  const { me } = useContext(MeContext)
  const isMe = () => me?.id == userId

  const apiService = useApiService()

  const params = useParams()

  const {elements, endOfElements}: {elements: Post[], endOfElements: boolean} = useInfiniteScroll(
    apiService.getUserPosts, 
    (state) => state.post.posts,
    addPosts,
    clearPosts,
    undefined,
    {id: parseInt(params.id!)})

  return (
    <div className="border-t border-black/10 overflow-hidden">
      <div className="grid divide-y divide-black/10">
        <TransitionGroup component={null}>
        {elements?.map((post: Post) => 
          <CSSTransition
            in={post.options?.animate}
            appear={post.options?.animate}
            timeout={2000}
            classNames='post'
            key={post.id}
          >
            <SinglePost appendRepost={isMe()} isMe={isMe()} key={post.id} post={post} includeRepostHeader={false}/>
          </CSSTransition>
        )}
        </TransitionGroup>
      </div>
      { !endOfElements &&
        <div className="flex justify-center p-6"> 
          <span className="loader"></span>
        </div>
      }
    </div>
  )
}