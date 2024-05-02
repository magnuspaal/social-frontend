import { CSSTransition, TransitionGroup } from "react-transition-group";
import SinglePost from "../post/SinglePost";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import useApiService from "@/services/api-service";
import { addPosts, clearPosts } from "@/store/post-slice";
import Loading from "../common/Loading";
import { Post } from "@/types/post";
import TransitionWrapper from "../common/TransitionWrapper";

export default function Feed() {

  const apiService = useApiService()

  const {elements, endOfElements}: {elements: Post[], endOfElements: boolean} = useInfiniteScroll(
    apiService.getFeed, 
    (state) => state.post.posts,
    addPosts,
    clearPosts
  )

  return (
    <div className="rounded-md overflow-hidden shadow-up">
      <div className="grid divide-y divide-black/10">
        <TransitionGroup component={null}>        
          {elements?.map((post: Post) =>
            <TransitionWrapper key={post.id}>
              <CSSTransition
                in={post.options?.animate}
                appear={post.options?.animate}
                timeout={2000}
                classNames='post'>
                  <SinglePost key={post.id} post={post} includeRepostHeader={false} />
              </CSSTransition>
            </TransitionWrapper>
          )}
        </TransitionGroup>
      </div>
      { !endOfElements &&
        <div className="flex justify-center p-6"> 
          <Loading />
        </div>
      }
    </div>
  )
}