import serverApiService from "@/services/server/server-api-service";
import UserPreview from "@/components/common/UserPreview";

export default async function Post({ params }: any) {

  const following = await serverApiService.getUserFollowers(params.id)

  return (
    <div className="p-2 space-y-4 mx-3 mb-2">
      {following.map((user) => <UserPreview user={user} key={user.id}/>)}
    </div>
  )
}