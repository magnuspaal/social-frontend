

import { useEffect, useState } from 'react';
import ChatPreview from './ChatPreview';
import useMessagingService from '@/services/messaging-service';
import Loading from '@/components/common/Loading';
import { Chat } from '@/types/chat';
import useTranslation from '@/lang/use-translation';

export default function ChatRooms() {

  const { t } = useTranslation()

  const messagingApiService = useMessagingService()

  const [chats, setChats] = useState<Chat[]>()

  useEffect(() => {
    const getChats = async () => {
      setChats(await messagingApiService.getUserChats())
    } 
    getChats()
  }, [])

  if (chats) {
    return (
      <div className='flex flex-col divide-black/40'>
        <div className='text-2xl font-bold uppercase tracking-wider pt-5 pb-2 pl-4 mb-2 border-b'>{t('chat.chat')}</div>
        {
          chats.map((chat) => <ChatPreview key={chat.id} chat={chat}></ChatPreview>)
        }
      </div>
    )
  } else <Loading></Loading>

}