import { TransitionGroup, CSSTransition } from "react-transition-group";
import TransitionWrapper from "../common/TransitionWrapper";
import SinglePost from "./SinglePost";
import { Post } from "@/types/post";
import Loading from "../common/Loading";

export default function PostReplies({ postReplies, endOfPostReplies }: { postReplies: Post[], endOfPostReplies: boolean}) {

  return (
    <div>
      <h2 className="pl-2 py-4 text-xl font-bold">Replies</h2>
      <TransitionGroup className="grid divide-y divide-black/10">
        {postReplies.map((post: Post) =>
          <TransitionWrapper key={post.id}>
            <CSSTransition
              in={post.options?.animate}
              appear={post.options?.animate}
              timeout={2000}
              classNames='post'>
                <SinglePost clickable={false} includeReplyHeader={false} key={post.id} post={post} />
            </CSSTransition>
          </TransitionWrapper>
        )}
      </TransitionGroup>
      { !endOfPostReplies &&
        <div className="flex justify-center p-6"> 
          <Loading />
        </div>
      }
    </div>
  );
}
