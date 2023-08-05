
import ReplyToPost from "@/components/input/ReplyToPost";
import SinglePost from "@/components/post/SinglePost";
import apiService from "@/lib/api-service";

export default async function Post({ params }: any) {

  const post = await apiService.getPost(params.id);
  const postReplies = await apiService.getPostReplies(params.id, 0, 50)

  return (
    <div className=" p-2 grid divide-y divide-black/40 border border-black/40 rounded">
      <SinglePost key={"post-" + post.id} post={post} clickable={false}/>
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
}