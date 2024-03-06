'use client'

import useMessagingApiService from "@/services/client-messaging-service";
import { User } from "@/types/user";
import Image from "next/image"

export default function SendMessageButton({me, user, dict, className}: {me: User, user: User, dict: any, className: any}) {

  const messagingApiService = useMessagingApiService()

  const handleClick = () => {
    const formData = new FormData();
    formData.append('userIds', me.id.toString());
    formData.append('userIds', user.id.toString());
    messagingApiService.createChat(formData);
  }

  return (
    <button onClick={handleClick} className={`rounded font-bold black p-1 bg-secondary border border-transparent text-white ${className}`}>
      <Image src='/send.svg' width={25} height={20} alt="Like button"/>
    </button>
  )
}