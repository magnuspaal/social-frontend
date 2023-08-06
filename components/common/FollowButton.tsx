'use client'

import useClientApiService from "@/services/client-api-service"
import { User } from "@/types/user"
import { useRouter } from "next/navigation"

export default function FollowButton({account, width='w-20', size='text-sm'}: {account: User, width?: string, size?: string}) {

  const router = useRouter()
  const clientApiService = useClientApiService()

  const handleClick = async (event: any) => {
    event.preventDefault()
    await clientApiService.followUser(account.id)
    router.refresh()
  }

  return (
    <button onClick={handleClick} className={`rounded font-bold p-1 ${size} ${account.followed ? 'bg-0 border border-black rounded' : 'bg-primary text-white'} ${width}`}>
      {account.followed ? 'Following' : 'Follow'}
    </button>
  )
}