import AccountPreview from "@/components/right-side-bar/AccountPreview";
import apiService from "@/services/api-service";

export default async function Post({ params }: any) {

  const following = await apiService.getUserFollowing(params.id)

  return (
    <div className="p-2">
      {following.map((user) => <AccountPreview account={user} key={user.id}/>)}
    </div>
  )
}