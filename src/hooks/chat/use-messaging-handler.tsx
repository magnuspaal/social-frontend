import { ChatMessage } from "@/types/chat/chat-message/";
import { ChatMessageType } from "@/types/chat/chat-message/chat-message-type";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import { useCallback, useContext, useEffect, useState } from "react";
import useMessagingHandlerMethods from "./use-messaging-handler-methods";
import { AuthContext } from "@/providers/auth-provider";
import { MeContext } from "@/providers/me-provider";
import useMessagingPublisherMethods from "./use-messaging-publisher";

const useMessagingHandler = (
  client: Client | undefined
) => {

  const [subscription, setSubscription] = useState<StompSubscription>()
  const [loading, setLoading] = useState<boolean>()
  const { 
    handleMessage, 
    handleExceptionMessage, 
    handleWritingMessage, 
    handleWritingEndMessage,
    handleSeenMessage,
    handleActiveMessage
  } = useMessagingHandlerMethods(client)

  const { logout } = useContext(AuthContext);
  const { me } = useContext(MeContext);

  const { startActivity } = useMessagingPublisherMethods(client) 

  const handle = useCallback(async (message: IMessage, privateKey: string) => {
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
      case ChatMessageType.ACTIVE:
        handleActiveMessage(chatMessage, false)
        break
      case ChatMessageType.CONNECT:
        handleActiveMessage(chatMessage, true)
        break;
      default:
        handleMessage(chatMessage, privateKey)
    }
  }, [handleActiveMessage, handleExceptionMessage, handleMessage, handleSeenMessage, handleWritingEndMessage, handleWritingMessage])

  useEffect(() => {
    const privateKey = localStorage.getItem('privateKey')
    
    if (privateKey) {
      if (client && !subscription) {
        const stompSubscription = client.subscribe('/user/topic/message', async message => handle(message, privateKey))
        setSubscription(stompSubscription)
        if (me) startActivity(me.id)
      }
    } else {
      logout()
    }

    setLoading(false)
  }, [client, setLoading, setSubscription, subscription, handleMessage, logout, me, startActivity, handle])

  return loading;
} 

export default useMessagingHandler;