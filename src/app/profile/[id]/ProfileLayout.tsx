

import Loading from '@/components/common/Loading'
import Profile from '@/components/profile/Profile'
import useApiService from '@/services/api-service'
import { User } from '@/types/user'
import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'

export default function ProfileLayout() {

  const params = useParams()

  const apiService = useApiService()
  
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const getUser = async () => {
      if (params.id) {
        setUser(await apiService.getUser(parseInt(params.id)))
      }
    }
    getUser()
  }, [params.id])
  
  if (user) {
    return (
      <div className="sm:shadow-up rounded-md w-full">
        <div className="grid gap-3">
          <Profile user={user} />
          <Outlet />
        </div>
      </div>
    )
  } else return (
    <div className='flex justify-center items-center h-full w-full'>
      <Loading size={75} borderWidth={8}/>
    </div>
  )   
}
