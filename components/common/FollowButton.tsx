'use client'

import useClientApiService from "@/services/client/client-api-service"
import { useAppDispatch } from "@/store/hooks"
import { AlertType, addAlert } from "@/store/alert-slice"
import { User } from "@/types/user"
import { useState } from "react"
import useTranslation from "@/lang/use-translation"

export default function FollowButton({user, className='max-w-[100px] min-w-[100px] text-sm'}: {user: User, className?: string}) {

  const { t } = useTranslation()
  const clientApiService = useClientApiService()
  
  const [followed, setFollowed] = useState(user.followed)

  const dispatch = useAppDispatch()

  const handleClick = async (event: any) => {
    event.preventDefault()
    const follow = await clientApiService.followUser(user.id)
    if (!follow.deletedAt) {
      setFollowed(true)
      dispatch(addAlert({message: `${t('follow.following_started')} ${user.username}`, type: AlertType.SUCCESS}))
    }
    else {
      setFollowed(false)
      dispatch(addAlert({message: `${t('follow.following_ended')} ${user.username}`, type: AlertType.ERROR}))
    }
  }

  return (
    <button onClick={handleClick} className={`rounded font-bold black p-1 w-full ${followed ? 'bg-0 border border-black rounded' : 'bg-primary border border-transparent text-white'} ${className}`}>
      {followed ? t('follow.following') : t('follow.follow')}
    </button>
  )
}