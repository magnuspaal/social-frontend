import apiService from "@/services/api-service";
import UserPreview from "@/components/common/UserPreview";
import { getDictionary } from "@/lang/lang";

export default async function Post({ params }: any) {

  const following = await apiService.getUserFollowers(params.id)
  const dict = await getDictionary(params.lang);

  return (
    <div className="p-2 space-y-4 mx-3 mb-2">
      {following.map((user) => <UserPreview dict={dict} user={user} key={user.id}/>)}
    </div>
  )
}