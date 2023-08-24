import apiService from "@/services/api-service"
import UserPreview from "@/components/common/UserPreview"

export default async function UsersPreview() {

  const users = await apiService.getUsers()

  return (
    <div className="flex flex-col items-center grid gap-4 divide-y divide-black/40">
      <div className="">Accounts to follow</div>
      {users.map(((user) => <UserPreview user={user} key={user.id} />))}
    </div>
  )
}