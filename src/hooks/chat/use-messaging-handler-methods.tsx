

import useTranslation from "@/lang/use-translation";
import { AlertType, addAlert } from "@/store/alert-slice";
import { useAppDispatch } from "@/store/hooks";
import { addActiveUser, addMessage, addReaction, clearWritingMessage, removeActiveUser, setWritingMessage, updateSeenMessages } from "@/store/messaging-slice";
import { ActiveChatMessage, ChatMessage, ReactionChatMessage } from "@/types/chat/chat-message/";
import { logInfo } from "@/utils/development-utils";
import { decryptMessage } from "@/utils/encryption-utils";
import { useCallback, useEffect, useRef } from "react";
import useMessagingPublisherMethods from "./use-messaging-publisher";
import { Client } from "@stomp/stompjs";
import { Buffer } from "buffer";
import { useLocation } from "react-router-dom";

const useMessagingHandlerMethods = (client: Client | undefined) => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation();
  const { submitSeen, submitActive } = useMessagingPublisherMethods(client)

  const timeout = useRef<NodeJS.Timeout>()

  const pathnameRef = useRef<string>("")
  const pathname = useLocation()

  useEffect(() => {
    pathnameRef.current = pathname.pathname
  }, [pathname])

  const handleMessage = useCallback(async (message: ChatMessage, privateKey: string) => {
    await decryptMessage(message, privateKey)

    message.options = { animate: true }

    logInfo("Regular message:", message.chatMessageId)

    dispatch(clearWritingMessage({chatId: message.chatId, sender: message.sender}))
    dispatch(addMessage(message))

    if (pathnameRef.current == `/chat/${message.chatId}`) {
      submitSeen(message.owner.id, message.chatId, message.chatMessageId);
    }
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
    const messageId = parseInt(Buffer.from(message.content, 'base64').toString())
    logInfo("Seen message (sender, seen message id):", message.sender.id, messageId)
    message.chatId
    dispatch(updateSeenMessages({messageId, chatId: message.chatId, senderId: message.sender.id}))
  }, [dispatch])

  const handleActiveMessage = useCallback((message: ActiveChatMessage, isConnectMessage: boolean) => {
    dispatch(addActiveUser(message.sender))
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      dispatch(removeActiveUser(message.sender))
    }, 10 * 1000)
    if (isConnectMessage) {
      submitActive(message.owner.id)
    }
  }, [dispatch, submitActive])

  const handleReactionMessage = useCallback((message: ReactionChatMessage) => {
    dispatch(addReaction(message))
  }, [dispatch])

  return {
    handleMessage, 
    handleExceptionMessage, 
    handleWritingMessage, 
    handleWritingEndMessage,
    handleSeenMessage,
    handleActiveMessage,
    handleReactionMessage
  };
} 

export default useMessagingHandlerMethods;