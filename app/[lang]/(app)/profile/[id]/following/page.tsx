import UserPreview from "@/components/common/UserPreview";
import { getDictionary } from "@/lang/lang";
import apiService from "@/services/api-service";

export default async function Post({ params }: any) {

  const following = await apiService.getUserFollowing(params.id)
  const dict = await getDictionary(params.lang)

  return (
    <div className="p-2 space-y-4 mx-3 mb-2">
      {following.map((user) => <UserPreview dict={dict} user={user} key={user.id}/>)}
    </div>
  )
}