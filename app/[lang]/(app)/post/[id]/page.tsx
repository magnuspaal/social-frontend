
import ReplyToPost from "@/components/input/ReplyToPost";
import SinglePost from "@/components/post/SinglePost";
import { getDictionary } from "@/lang/lang";
import apiService from "@/services/api-service";
import { redirect } from "next/navigation";

export default async function Post({ params }: any) {

  const dict = await getDictionary(params.lang)

  const post = await apiService.getPost(params.id).catch(() => redirect('/'));
  const postReplies = await apiService.getPostReplies(params.id, 0, 50).catch(() => [])
  const me = await apiService.getMe()
  const isMe = () => me.id == post.user.id

  return (
    <div className="p-2 grid divide-y divide-black/40 border border-black/40 rounded">
      <SinglePost dict={dict} key={"post-" + post.id} isMe={isMe()} post={post} clickable={false}/>
      <ReplyToPost dict={dict} postId={post.id}/>
      { postReplies.length != 0 &&
        <div>
          <h2 className="pl-2 py-4 text-xl font-bold">Replies</h2>
          <div className="grid divide-y divide-black/40 border border-black/40"> 
            {postReplies.map((post: any) => <SinglePost dict={dict} clickable={false} includeReplyHeader={false} key={"reply-" + post.id} post={post} />)}
          </div>
        </div>
      }
    </div>
  )
}