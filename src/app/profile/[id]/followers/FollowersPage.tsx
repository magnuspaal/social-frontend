

import UserPreview from "@/components/common/UserPreview";
import { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import { User } from "@/types/user";
import useApiService from "@/services/api-service";
import { useParams } from "react-router-dom";

export default function FollowersPage() {

  const params = useParams()
  const apiService = useApiService()

  const [followers, setFollowers] = useState<User[]>()

  useEffect(() => {
    const getFollowers = async () => {
      if (params.id) {
        setFollowers(await apiService.getUserFollowers(parseInt(params.id)))
      }
    }
    getFollowers()
  }, [])

  if (followers) {
    return (
      <div className="p-2 space-y-4 mx-3 mb-2">
        {followers.map((user) => <UserPreview user={user} key={user.id}/>)}
      </div>
    )
  } else return (
    <div className='flex justify-center items-center h-full w-full'>
      <Loading size={75} borderWidth={8}/>
    </div>
  )
}