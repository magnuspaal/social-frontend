import apiService from "@/services/api-service";
import UserPreview from "@/components/common/UserPreview";

export default async function Post({ params }: any) {

  const following = await apiService.getUserFollowers(params.id)

  return (
    <div className="p-2">
      {following.map((user) => <UserPreview user={user} key={user.id}/>)}
    </div>
  )
}