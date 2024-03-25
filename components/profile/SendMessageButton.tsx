'use client'

import useTranslation from "@/lang/use-translation";
import useClientMessagingApiService from "@/services/client/client-messaging-service";
import { MeContext } from "@/services/me-provider";
import { AlertType, addAlert } from "@/store/alert-slice";
import { User } from "@/types/user";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useDispatch } from "react-redux";

export default function SendMessageButton({user, className}: {user: User, className: any}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const clientMessagingApiService = useClientMessagingApiService()

  const { me } = useContext(MeContext)

  const handleClick = async () => {
    let privateChat;

    try {
      privateChat = await clientMessagingApiService.getPrivateChat(user.id)
    } catch (codes: string[] | any) {
      dispatch(addAlert({message: t(`chat.messages.${codes}`), type: AlertType.ERROR}))
      return;
    }
    
    if (privateChat) {
      router.push(`/chat/${privateChat.id}`)
    } else {
      await clientMessagingApiService.createChat(JSON.stringify({users: [{id: me?.id, username: me?.username}, {id: user.id, username: user.username}]}));
      router.push(`/chat`) 
    }
  }

  return (
    <button onClick={handleClick} className={`rounded font-bold black p-1 bg-secondary border border-transparent text-white ${className}`}>
      <Image src='/send.svg' width={25} height={20} alt="Like button"/>
    </button>
  )
}