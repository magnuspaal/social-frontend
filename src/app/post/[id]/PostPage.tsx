

import ReplyToPost from "@/components/input/ReplyToPost";
import SinglePost from "@/components/post/SinglePost";
import { MeContext } from "@/providers/me-provider";
import { useContext, useEffect, useState } from "react";
import { Post } from "@/types/post";
import Loading from "@/components/common/Loading";
import useApiService from "@/services/api-service";
import { useNavigate, useParams } from "react-router-dom";

export default function PostPage() {

  const params = useParams()

  const apiService = useApiService()
  const { me } = useContext(MeContext)
  const navigate = useNavigate()

  const isMe = () => me?.id == post?.user.id

  const [post, setPost] = useState<Post | void>()
  const [postReplies, setPostReplies] = useState<Post[]>()

  useEffect(() => {
    const getData = async () => {
      if (params.id) {
        setPost(await apiService.getPost(parseInt(params.id)).catch(() => { navigate('/') }))
        setPostReplies(await apiService.getPostReplies(parseInt(params.id), 0, 50).catch(() => []))
      }
    }
    getData()
  }, [params])

  if (post && postReplies) {
    return (
      <div className="p-2 grid divide-y divide-black/40 border border-black/40 rounded w-full">
        <SinglePost key={"post-" + post.id} isMe={isMe()} post={post} clickable={false}/>
        <ReplyToPost postId={post.id}/>
        { postReplies.length != 0 &&
          <div>
            <h2 className="pl-2 py-4 text-xl font-bold">Replies</h2>
            <div className="grid divide-y divide-black/40 border border-black/40"> 
              {postReplies.map((post: any) => <SinglePost clickable={false} includeReplyHeader={false} key={"reply-" + post.id} post={post} />)}
            </div>
          </div>
        }
      </div>
    )
  } else return <Loading></Loading>
}