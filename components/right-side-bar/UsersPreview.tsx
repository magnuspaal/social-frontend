import apiService from "@/services/api-service"
import UserPreview from "@/components/common/UserPreview"
import { getDictionary } from "@/lang/lang"

export default async function UsersPreview({params}: any) {

  const users = await apiService.getUsers()
  const dict = await getDictionary(params.lang)

  return (
    <div className="flex flex-col items-center grid gap-4 divide-y divide-black/40">
      <div className="">Accounts to follow</div>
      {users.map(((user) => <UserPreview dict={dict} user={user} key={user.id} />))}
    </div>
  )
}