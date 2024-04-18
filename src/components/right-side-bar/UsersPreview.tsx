

import UserPreview from "@/components/common/UserPreview"
import useApiService from "@/services/api-service"
import { User } from "@/types/user"
import { useEffect, useState } from "react"
import Loading from "../common/Loading"

export default function UsersPreview() {

  const apiService = useApiService()

  const [users, setUsers] = useState<User[]>()

  useEffect(() => {
    const getUsers = async () => {
      setUsers(await apiService.getUsers())
    }
    getUsers()
  })

  if (users) {
    return (
      <div className="flex flex-col items-center grid gap-4 divide-y divide-black/40">
        <div className="">Accounts to follow</div>
        {users.map(((user) => <UserPreview user={user} key={user.id} />))}
      </div>
    )
  } else return <Loading></Loading>

}