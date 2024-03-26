'use client'

import useTranslation from "@/lang/use-translation";
import { AlertType, addAlert } from "@/store/alert-slice";
import { useAppDispatch } from "@/store/hooks";
import { addMessage } from "@/store/messaging-slice";
import { ChatMessage } from "@/types/chat-message/";
import { ChatMessageType } from "@/types/chat-message/chat-message-type";
import { decryptText } from "@/utils/encryption-utils";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

const useMessagingHandler = (
  client: Client | undefined,
  subscription: StompSubscription | undefined,
  setSubscription: Dispatch<SetStateAction<StompSubscription | undefined>>,
  setPrivateKey: Dispatch<SetStateAction<string | null | undefined>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  scrollElement: RefObject<HTMLDivElement>
) => {

  const dispatch = useAppDispatch()

  const { t } = useTranslation();

  useEffect(() => {
    const handleExceptionMessage = (message: ChatMessage) => {
      const base64MessageContent = Buffer.from(message.content, 'base64').toString()
      const messageContent = t(`chat.messages.${base64MessageContent}`) ?? t(`chat.messages.default`)
      dispatch(addAlert({type: AlertType.ERROR, message: messageContent}))
    }

    const handleRegularMessage = async (message: ChatMessage, privateKey: string) => {
      const decryptedMessage = await decryptText(message.content, privateKey)
      message.content = decryptedMessage ?? "Message could not be decrypted"
      dispatch(addMessage(message))
      if (scrollElement.current && -scrollElement.current.scrollTop < 40) {
          scrollElement.current.scrollTo({top: 0});
      }
    }

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
    setPrivateKey(privateKey);
    
    if (privateKey && client && !subscription) {
      const stompSubscription = client.subscribe('/user/topic/message', async message => handleMessage(message, privateKey))
      setSubscription(stompSubscription)
    }

    setLoading(false)
  }, [client, dispatch, scrollElement, setLoading, setPrivateKey, setSubscription, subscription, t])
} 

export default useMessagingHandler;