'use client'

import useTranslation from "@/lang/use-translation";
import { useAppDispatch } from "@/store/hooks";
import { ChatMessage } from "@/types/chat-message/";
import { ChatMessageType } from "@/types/chat-message/chat-message-type";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import useMessagingHandlerMethods from "./use-messaging-handler-methods";
import clientAuthService from "@/services/client/client-auth-service";
import { useRouter } from "next/navigation";

const useMessagingHandler = (
  client: Client | undefined
) => {

  const dispatch = useAppDispatch()
  const router = useRouter()

  const { t } = useTranslation();
  
  const [subscription, setSubscription] = useState<StompSubscription>()
  const [loading, setLoading] = useState<boolean>()

  const { handleRegularMessage, handleExceptionMessage } = useMessagingHandlerMethods()

  useEffect(() => {

    const handleMessage = async (message: IMessage, privateKey: string) => {
      const chatMessage: ChatMessage = JSON.parse(message.body)

      switch (chatMessage.type) {
        case ChatMessageType.EXCEPTION:
          handleExceptionMessage(chatMessage)
          break
        default:
          handleRegularMessage(chatMessage, privateKey)
      }
    }

    const privateKey = localStorage.getItem('privateKey')
    
    if (privateKey) {
      if (client && !subscription) {
        const stompSubscription = client.subscribe('/user/topic/message', async message => handleMessage(message, privateKey))
        setSubscription(stompSubscription)
      }
    } else {
      clientAuthService.logout()
      router.push('/login')
      router.refresh()
    }

    setLoading(false)
  }, [client, dispatch, handleExceptionMessage, handleRegularMessage, router, setLoading, setSubscription, subscription, t])

  return loading;
} 

export default useMessagingHandler;