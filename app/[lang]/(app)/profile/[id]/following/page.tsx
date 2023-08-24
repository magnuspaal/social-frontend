import UserPreview from "@/components/common/UserPreview";
import apiService from "@/services/api-service";

export default async function Post({ params }: any) {

  const following = await apiService.getUserFollowing(params.id)

  return (
    <div className="p-2">
      {following.map((user) => <UserPreview user={user} key={user.id}/>)}
    </div>
  )
}