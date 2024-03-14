'use client'

import useMessagingApiService from "@/services/client-messaging-service";
import { User } from "@/types/user";
import Image from "next/image"
import { useRouter } from "next/navigation";

export default function SendMessageButton({me, user, dict, className}: {me: User, user: User, dict: any, className: any}) {
  const router = useRouter();

  const messagingApiService = useMessagingApiService()

  const handleClick = () => {
    messagingApiService.createChat(JSON.stringify({users: [{id: me.id, username: me.username}, {id: user.id, username: user.username}]}));
    router.push('/chat') 
  }

  return (
    <button onClick={handleClick} className={`rounded font-bold black p-1 bg-secondary border border-transparent text-white ${className}`}>
      <Image src='/send.svg' width={25} height={20} alt="Like button"/>
    </button>
  )
}