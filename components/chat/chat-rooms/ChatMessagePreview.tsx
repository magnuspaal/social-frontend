'use client'

import { ChatMessage } from '@/types/chat-message';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import useClientMessagingService from '@/services/client/client-messaging-service';
import { addMessages } from '@/store/messaging-slice';
import { getMessageTimestamp } from '@/utils/date-utils';
import { MeContext } from '@/providers/me-provider';
import useTranslation from '@/lang/use-translation';

export default function ChatMessagePreview({chatId}: {chatId: number}) {

  const dispatch = useAppDispatch()
  const clientMessagingService = useClientMessagingService()
  const { me } = useContext(MeContext)
  const { t } = useTranslation()
  
  const lastCacheMessage = useAppSelector((state) => {
    const messages = state.messaging.messages[chatId]
    if(messages) {
      return messages[0]
    }
  })

  const [lastMessage, setLastMessage] = useState<ChatMessage>()

  useEffect(() => {
    const getLastMessage = async () => {
      if (!lastCacheMessage) {
        const messages = await clientMessagingService.getChatMessages(0, 1, chatId)
        dispatch(addMessages(messages))
      } else {
        setLastMessage(lastCacheMessage)
      }
    }
    getLastMessage()
  }, [chatId, clientMessagingService, dispatch, lastCacheMessage])

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
}