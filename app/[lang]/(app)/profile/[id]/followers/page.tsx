import apiService from "@/services/api-service";
import AccountPreview from "@/components/right-side-bar/AccountPreview";

export default async function Post({ params }: any) {

  const following = await apiService.getUserFollowers(params.id)

  return (
    <div className="p-2">
      {following.map((user) => <AccountPreview account={user} key={user.id}/>)}
    </div>
  )
}