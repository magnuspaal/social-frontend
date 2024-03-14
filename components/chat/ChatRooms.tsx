import { User } from '@/types/user';
import ChatUserPreview from './ChatPreview';
import messagingApiService from '@/services/messaging-service';

export default async function ChatRooms({me, dict}: {me: User, dict: any}) {

  const chats = await messagingApiService.getUserChats(me.id);

  return (
    <div className='flex flex-col divide-y divide-black/40'>
      <div className='text-2xl font-bold uppercase tracking-wider mt-6 mb-3 ml-8'>{dict.chat.chat}</div>
      {
        chats.map((chat) => <ChatUserPreview key={chat.id} dict={dict} chat={chat}></ChatUserPreview>)
      }
    </div>
  )
}