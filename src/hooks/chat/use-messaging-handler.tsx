import { ChatMessage } from "@/types/chat/chat-message/";
import { ChatMessageType } from "@/types/chat/chat-message/chat-message-type";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import { useCallback, useContext, useEffect, useState } from "react";
import useMessagingHandlerMethods from "./use-messaging-handler-methods";
import { AuthContext } from "@/providers/auth-provider";

const useMessagingHandler = (
  client: Client | undefined
) => {

  const [subscription, setSubscription] = useState<StompSubscription>()
  const [loading, setLoading] = useState<boolean>()
  const { 
    handleRegularMessage, 
    handleExceptionMessage, 
    handleWritingMessage, 
    handleWritingEndMessage,
    handleSeenMessage
  } = useMessagingHandlerMethods(client)

  const { logout } = useContext(AuthContext);

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
      logout()
    }

    setLoading(false)
  }, [client, setLoading, setSubscription, subscription, handleMessage, logout])

  return loading;
} 

export default useMessagingHandler;