import ChatUserPreview from './ChatPreview';
import messagingApiService from '@/services/server/server-messaging-service';
import t from '@/lang/server-translation';
import serverApiService from '@/services/server/server-api-service';

export default async function ChatRooms() {

  const me = await serverApiService.getMe()

  const chats = await messagingApiService.getUserChats(me.id);

  return (
    <div className='flex flex-col divide-y divide-black/40'>
      <div className='text-2xl font-bold uppercase tracking-wider mt-6 mb-3 ml-8'>{t('chat.chat')}</div>
      {
        chats.map((chat) => <ChatUserPreview key={chat.id} chat={chat}></ChatUserPreview>)
      }
    </div>
  )
}