import { CSSTransition, TransitionGroup } from "react-transition-group";
import SinglePost from "../post/SinglePost";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import useApiService from "@/services/api-service";
import { addPosts, clearPosts } from "@/store/post-slice";

export default function Feed() {

  const apiService = useApiService()

  const [posts, endOfPosts] = useInfiniteScroll(
    apiService.getFeed, 
    (state) => state.post.posts,
    addPosts,
    clearPosts
  )

  return (
    <div className="rounded-md overflow-hidden shadow-up">
      <TransitionGroup className="grid divide-y divide-black/10">        
        {posts?.map((post: any) => 
          <CSSTransition
          key={post.id}
          timeout={2000}
          classNames='post'>
            <SinglePost key={post.id} post={post} includeRepostHeader={false} />
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