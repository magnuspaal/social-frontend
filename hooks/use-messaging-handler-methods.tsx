'use client'

import useTranslation from "@/lang/use-translation";
import { AlertType, addAlert } from "@/store/alert-slice";
import { useAppDispatch } from "@/store/hooks";
import { addMessage } from "@/store/messaging-slice";
import { ChatMessage } from "@/types/chat-message/";
import { decryptText } from "@/utils/encryption-utils";
import { useCallback} from "react";

const useMessagingHandlerMethods = () => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation();

  const handleRegularMessage = useCallback(async (message: ChatMessage, privateKey: string) => {
    const decryptedMessage = await decryptText(message.content, privateKey)
    message.content = decryptedMessage ?? "Message could not be decrypted"
    process.env.NODE_ENV == 'development' && console.log(message)
    dispatch(addMessage(message))
  }, [dispatch])

  const handleExceptionMessage = useCallback((message: ChatMessage) => {
    const base64MessageContent = Buffer.from(message.content, 'base64').toString()
    const messageContent = t(`chat.messages.${base64MessageContent}`) ?? t(`chat.messages.default`)
    dispatch(addAlert({type: AlertType.ERROR, message: messageContent}))
  }, [dispatch, t])

  return {handleRegularMessage, handleExceptionMessage};
} 

export default useMessagingHandlerMethods;