import UserPostList from "@/components/profile/UserPostList";
import apiService from "@/lib/api-service";

export default async function ProfileHome({ params }: any) {

  const user = await apiService.getMe()

  return (
    <div>
      <UserPostList me={user} userId={params.id}/>
    </div>
  )
}