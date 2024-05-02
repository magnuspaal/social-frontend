

import Loading from "@/components/common/Loading";
import UserPreview from "@/components/common/UserPreview";
import useApiService from "@/services/api-service";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FollowingPage() {

  const params = useParams()
  const apiService = useApiService()

  const [following, setFollowing] = useState<User[]>()

  useEffect(() => {
    const getFollowing = async () => {
      if (params.id) {
        setFollowing(await apiService.getUserFollowing(parseInt(params.id)))
      }
    }
    getFollowing()
  }, [])

  if (following) {
    return (
      <div className="p-2 space-y-4 mx-3 mb-2">
        {following.map((user) => <UserPreview user={user} key={user.id}/>)}
      </div>
    )
  } else return (
    <div className='flex justify-center items-center h-full w-full'>
      <Loading size={75} borderWidth={8}/>
    </div>
  )
}