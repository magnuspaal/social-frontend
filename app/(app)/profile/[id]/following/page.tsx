import UserPreview from "@/components/common/UserPreview";
import serverApiService from "@/services/server/server-api-service";

export default async function Post({ params }: any) {

  const following = await serverApiService.getUserFollowing(params.id)

  return (
    <div className="p-2 space-y-4 mx-3 mb-2">
      {following.map((user) => <UserPreview user={user} key={user.id}/>)}
    </div>
  )
}