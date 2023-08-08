'use client'

import useClientApiService from "@/services/client-api-service"
import { useAppDispatch } from "@/store/hooks"
import { AlertType, addAlert } from "@/store/alert-slice"
import { User } from "@/types/user"
import { useRouter } from "next/navigation"

export default function FollowButton({account, width='w-20', size='text-sm'}: {account: User, width?: string, size?: string}) {

  const router = useRouter()
  const clientApiService = useClientApiService()

  const dispatch = useAppDispatch()

  const handleClick = async (event: any) => {
    event.preventDefault()
    await clientApiService.followUser(account.id)
    router.refresh()
    if (account.followed) dispatch(addAlert({message: `Following ${account.username}`, type: AlertType.SUCCESS}))
    else dispatch(addAlert({message: `Unfollowed ${account.username}`, type: AlertType.ERROR}))
  }

  return (
    <button onClick={handleClick} className={`rounded font-bold p-1 ${size} ${account.followed ? 'bg-0 border border-black rounded' : 'bg-primary text-white'} ${width}`}>
      {account.followed ? 'Following' : 'Follow'}
    </button>
  )
}