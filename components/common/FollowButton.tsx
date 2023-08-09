'use client'

import useClientApiService from "@/services/client-api-service"
import { useAppDispatch } from "@/store/hooks"
import { AlertType, addAlert } from "@/store/alert-slice"
import { User } from "@/types/user"
import { useRouter } from "next/navigation"

export default function FollowButton({account, className='max-w-[100px] min-w-[100px] text-sm'}: {account: User, className?: string}) {

  const router = useRouter()
  const clientApiService = useClientApiService()

  const dispatch = useAppDispatch()

  const handleClick = async (event: any) => {
    event.preventDefault()
    const follow = await clientApiService.followUser(account.id)
    if (!follow.deletedAt) dispatch(addAlert({message: `Following ${account.username}`, type: AlertType.SUCCESS}))
    else dispatch(addAlert({message: `Unfollowed ${account.username}`, type: AlertType.ERROR}))
    router.refresh()
  }

  return (
    <button onClick={handleClick} className={`rounded font-bold black p-1 w-full ${account.followed ? 'bg-0 border border-black rounded' : 'bg-primary border border-transparent text-white'} ${className}`}>
      {account.followed ? 'Following' : 'Follow'}
    </button>
  )
}