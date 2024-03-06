import { User } from '@/types/user';
import ChatUserPreview from './ChatPreview';
import messagingApiService from '@/services/messaging-service';

export default async function ChatRooms({me, dict}: {me: User, dict: any}) {

  const chats = await messagingApiService.getUserChats(me.id);

  return (
    <div className='flex flex-col divide-y divide-black/40'>
      {
        chats.map((chat) => <ChatUserPreview key={chat.id} dict={dict} chat={chat}></ChatUserPreview>)
      }
    </div>
  )
}