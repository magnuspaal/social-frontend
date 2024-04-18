

import UserPreview from "@/components/common/UserPreview";
import { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import { User } from "@/types/user";
import useApiService from "@/services/api-service";
import { useOutletContext } from "react-router-dom";

export default function FollowersPage() {

  const apiService = useApiService()

  const user = useOutletContext<User>();
  const [followers, setFollowers] = useState<User[]>()

  useEffect(() => {
    const getFollowers = async () => {
      setFollowers(await apiService.getUserFollowers(user.id))
    }
    getFollowers()
  }, [])

  if (user && followers) {
    return (
      <div className="p-2 space-y-4 mx-3 mb-2">
        {followers.map((user) => <UserPreview user={user} key={user.id}/>)}
      </div>
    )
  } else return <Loading></Loading>
}