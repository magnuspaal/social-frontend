'use client'

import { ChatMessage } from "@/types/chat/chat-message/";
import { ChatMessageType } from "@/types/chat/chat-message/chat-message-type";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import { useCallback, useEffect, useState } from "react";
import useMessagingHandlerMethods from "./use-messaging-handler-methods";
import clientAuthService from "@/services/client/client-auth-service";
import { useRouter } from "next/navigation";

const useMessagingHandler = (
  client: Client | undefined
) => {
  const router = useRouter()

  const [subscription, setSubscription] = useState<StompSubscription>()
  const [loading, setLoading] = useState<boolean>()
  const { 
    handleRegularMessage, 
    handleExceptionMessage, 
    handleWritingMessage, 
    handleWritingEndMessage,
    handleSeenMessage
  } = useMessagingHandlerMethods(client)

  const handleMessage = useCallback(async (message: IMessage, privateKey: string) => {
    const chatMessage: ChatMessage = JSON.parse(message.body)

    switch (chatMessage.type) {
      case ChatMessageType.EXCEPTION:
        handleExceptionMessage(chatMessage)
        break
      case ChatMessageType.WRITING:
        handleWritingMessage(chatMessage)
        break
      case ChatMessageType.WRITING_END:
        handleWritingEndMessage(chatMessage)
        break
      case ChatMessageType.SEEN:
        handleSeenMessage(chatMessage)
        break
      default:
        handleRegularMessage(chatMessage, privateKey)
    }
  }, [handleExceptionMessage, handleRegularMessage, handleSeenMessage, handleWritingEndMessage, handleWritingMessage])

  useEffect(() => {
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
  }, [client, router, setLoading, setSubscription, subscription, handleMessage])

  return loading;
} 

export default useMessagingHandler;