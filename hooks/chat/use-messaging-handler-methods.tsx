'use client'

import useTranslation from "@/lang/use-translation";
import { AlertType, addAlert } from "@/store/alert-slice";
import { useAppDispatch } from "@/store/hooks";
import { addMessage, clearWritingMessage, setWritingMessage } from "@/store/messaging-slice";
import { ChatMessage } from "@/types/chat-message/";
import { logInfo } from "@/utils/development-utils";
import { decryptText } from "@/utils/encryption-utils";
import { useCallback } from "react";
import useMessagingPublisherMethods from "./use-messaging-publisher";
import { Client } from "@stomp/stompjs";
import { updateSeenMessage } from "@/store/chat-slice";

const useMessagingHandlerMethods = (client: Client | undefined) => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation();
  const {submitSeen} = useMessagingPublisherMethods(client)

  const handleRegularMessage = useCallback(async (message: ChatMessage, privateKey: string) => {
    const decryptedMessage = await decryptText(message.content, privateKey)
    message.content = decryptedMessage ?? "Message could not be decrypted"
    message.options = { animate: true }

    logInfo(message)

    dispatch(clearWritingMessage({chatId: message.chatId, sender: message.sender}))
    dispatch(addMessage(message))

    submitSeen(message.owner.id, message.chatId, message.chatMessageId);
  }, [dispatch, submitSeen])

  const handleExceptionMessage = useCallback((message: ChatMessage) => {
    const base64MessageContent = Buffer.from(message.content, 'base64').toString()
    const messageContent = t(`chat.messages.${base64MessageContent}`) ?? t(`chat.messages.default`)
    dispatch(addAlert({type: AlertType.ERROR, message: messageContent}))
  }, [dispatch, t])

  const handleWritingMessage = useCallback((message: ChatMessage) => {
    dispatch(setWritingMessage({chatId: message.chatId, sender: message.sender}))
  }, [dispatch])

  const handleWritingEndMessage = useCallback((message: ChatMessage) => {
    dispatch(clearWritingMessage({chatId: message.chatId, sender: message.sender}))
  }, [dispatch])

  const handleSeenMessage = useCallback((message: ChatMessage) => {
    dispatch(updateSeenMessage({chatId: message.chatId, messageId: parseInt(Buffer.from(message.content, 'base64').toString()), userId: message.sender.id}))
  }, [dispatch])

  return {
    handleRegularMessage, 
    handleExceptionMessage, 
    handleWritingMessage, 
    handleWritingEndMessage,
    handleSeenMessage
  };
} 

export default useMessagingHandlerMethods;