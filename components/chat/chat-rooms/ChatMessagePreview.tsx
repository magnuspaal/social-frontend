'use client'

import { ChatMessage } from '@/types/chat-message';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getMessageTimestamp } from '@/utils/date-utils';
import { MeContext } from '@/providers/me-provider';
import useTranslation from '@/lang/use-translation';
import ChatMessageLoading from './ChatMessageLoading';
import { Chat } from '@/types/chat';
import { decryptText } from '@/utils/encryption-utils';
import { addMessage } from '@/store/messaging-slice';

export default function ChatMessagePreview({chat}: {chat: Chat}) {

  const dispatch = useAppDispatch()
  const { me } = useContext(MeContext)
  const { t } = useTranslation()
  
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
    const getLastMessage = async () => {
      if (!lastCacheMessage && chat.latestMessage) {
        const key = localStorage.getItem("privateKey")
        if (key) {
          const decrtypedText = await decryptText(chat.latestMessage.content, key)
          Object.assign(chat, {...chat, latestMessage: {...chat.latestMessage, content: decrtypedText}});
          dispatch(addMessage(chat.latestMessage))
          setLastMessage(chat.latestMessage)
        }
      } else {
        setLastMessage(lastCacheMessage)
      }
    }
    getLastMessage()
  }, [chat, chat.latestMessage, dispatch, lastCacheMessage])

  if (lastMessage) {
    return (
      <div>
        {lastMessage && 
          <div className='flex flex-col ml-2'>
            <p className="truncate text-sm">
              <span className='font-bold'>{`${me?.id == lastMessage.sender.id ? t("common.you") : lastMessage.sender.username}: `}</span>
              <span>{`${lastMessage.content}`}</span>
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