'use client'

import useClientApiService from "@/services/client-api-service"
import { useAppDispatch } from "@/store/hooks"
import { AlertType, addAlert } from "@/store/alert-slice"
import { User } from "@/types/user"
import { useState } from "react"

export default function FollowButton({account, className='max-w-[100px] min-w-[100px] text-sm'}: {account: User, className?: string}) {

  const clientApiService = useClientApiService()
  
  const [followed, setFollowed] = useState(account.followed)

  const dispatch = useAppDispatch()

  const handleClick = async (event: any) => {
    event.preventDefault()
    const follow = await clientApiService.followUser(account.id)
    if (!follow.deletedAt) {
      setFollowed(true)
      dispatch(addAlert({message: `Following ${account.username}`, type: AlertType.SUCCESS}))
    }
    else {
      setFollowed(false)
      dispatch(addAlert({message: `Unfollowed ${account.username}`, type: AlertType.ERROR}))
    }
  }

  return (
    <button onClick={handleClick} className={`rounded font-bold black p-1 w-full ${followed ? 'bg-0 border border-black rounded' : 'bg-primary border border-transparent text-white'} ${className}`}>
      {followed ? 'Following' : 'Follow'}
    </button>
  )
}