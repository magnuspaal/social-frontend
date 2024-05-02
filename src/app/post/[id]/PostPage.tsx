

import ReplyToPost from "@/components/input/ReplyToPost";
import SinglePost from "@/components/post/SinglePost";
import { MeContext } from "@/providers/me-provider";
import { useContext, useEffect, useState } from "react";
import { Post } from "@/types/post";
import Loading from "@/components/common/Loading";
import useApiService from "@/services/api-service";
import { useNavigate, useParams } from "react-router-dom";
import PostReplies from "@/components/post/PostReplies";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import { addPosts, clearPosts } from "@/store/post-slice";

export default function PostPage() {

  const params = useParams()

  const apiService = useApiService()
  const { me } = useContext(MeContext)
  const navigate = useNavigate()

  const isMe = () => me?.id == post?.user.id

  const [post, setPost] = useState<Post | void>()

  const {elements, endOfElements}: {elements: Post[], endOfElements: boolean} = useInfiniteScroll(
    apiService.getPostReplies,
    (state) => state.post.posts,
    addPosts,
    clearPosts,
    undefined,
    { id: parseInt(params.id!) }
  );

  useEffect(() => {
    const getData = async () => {
      if (params.id) {
        setPost(await apiService.getPost(parseInt(params.id)).catch(() => { navigate('/') }))
      }
    }
    getData()
  }, [params, elements])

  if (post) {
    return (
      <div className="p-2 grid divide-y divide-black/10 border shadow-up rounded w-full">
        <SinglePost key={"post-" + post.id} isMe={isMe()} post={post} clickable={false}/>
        <ReplyToPost postId={post.id}/>
        <PostReplies postReplies={elements} endOfPostReplies={endOfElements} />
      </div>
    )
  } else return (
    <div className='flex justify-center items-center h-full w-full'>
      <Loading size={75} borderWidth={8}/>
    </div>
  )
}