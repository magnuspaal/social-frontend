import UserPostList from "@/components/profile/UserPostList";
import { getDictionary } from "@/lang/lang";
import apiService from "@/services/api-service";

export default async function ProfileHome({ params }: any) {

  const dict = await getDictionary(params.lang)
  const user = await apiService.getMe()

  return (
    <div>
      <UserPostList dict={dict} me={user} userId={params.id}/>
    </div>
  )
}