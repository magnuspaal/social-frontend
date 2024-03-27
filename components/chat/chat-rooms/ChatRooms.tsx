import ChatPreview from './ChatPreview';
import messagingApiService from '@/services/server/server-messaging-service';
import t from '@/lang/server-translation';

export default async function ChatRooms() {

  const chats = await messagingApiService.getUserChats();

  return (
    <div className='flex flex-col divide-y divide-black/40'>
      <div className='text-2xl font-bold uppercase tracking-wider mt-6 mb-3 ml-8'>{t('chat.chat')}</div>
      {
        chats.map((chat) => <ChatPreview key={chat.id} chat={chat}></ChatPreview>)
      }
    </div>
  )
}