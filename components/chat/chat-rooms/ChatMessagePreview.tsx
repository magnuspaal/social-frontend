'use client'

import { ChatMessage } from '@/types/chat/chat-message';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getMessageTimestamp } from '@/utils/date-utils';
import { MeContext } from '@/providers/me-provider';
import useTranslation from '@/lang/use-translation';
import ChatMessageLoading from './ChatMessageLoading';
import { Chat } from '@/types/chat';
import { decryptText } from '@/utils/encryption-utils';

export default function ChatMessagePreview({chat}: {chat: Chat}) {
  const { me } = useContext(MeContext)
  const { t } = useTranslation()

  const [isUnread, setIsUnread] = useState<boolean>(false)
  
  const lastCacheMessage = useAppSelector((state) => {
    const messages = state.messaging.messages.filter((message) => {
      return message.chatId == chat.id
    })
    if(messages) {
      return messages[0]
    }
  })

  const [lastMessage, setLastMessage] = useState<ChatMessage>()

  useEffect(() => {

  }, [])

  // Set initial message on page load
  useEffect(() => {
    const getLastMessage = async () => {
      if (lastCacheMessage) {
        setLastMessage(lastCacheMessage)

        const latestSeenMessage = chat.chatUsers.find((chatUser) => chatUser.user.id == me?.id)?.latestSeenMessage

        if (latestSeenMessage && latestSeenMessage != lastCacheMessage.chatMessageId) {
          setIsUnread(true)
        }
      } else if (chat.latestMessage) {
        const key = localStorage.getItem("privateKey")
        if (key) {
          const decrtypedText = await decryptText(chat.latestMessage.content, key)
          const latestMessage = JSON.parse(JSON.stringify(chat.latestMessage))
          latestMessage.content = decrtypedText
          setLastMessage(latestMessage)

          const latestSeenMessage = chat.chatUsers.find((chatUser) => chatUser.user.id == me?.id)?.latestSeenMessage

          if (latestSeenMessage && latestMessage && latestSeenMessage != latestMessage.chatMessageId) {
            setIsUnread(true)
          }
        }
      }
    }
    getLastMessage()
  }, [])

  // Set message if received
  useEffect(() => {
    if (lastCacheMessage && lastMessage && lastMessage?.chatMessageId != lastCacheMessage?.chatMessageId) {
      setLastMessage(lastCacheMessage)
      setIsUnread(true)
    }
  }, [lastCacheMessage])

  if (lastMessage) {
    return (
      <div>
        {lastMessage && 
          <div className="flex flex-col ml-2">
            <p className={`truncate text-sm  ${isUnread && 'font-bold'}`}>
              <span>
                {`${me?.id == lastMessage.sender.id ? t("common.you") : lastMessage.sender.username}: `}
              </span>
              <span >{`${lastMessage.content}`}</span>
            </p>
            <p className='text-xs'>{`${getMessageTimestamp(lastMessage.createdAt)}`}</p>
          </div>
        }
      </div>
    )
  } else {
    return <ChatMessageLoading />
  }
}