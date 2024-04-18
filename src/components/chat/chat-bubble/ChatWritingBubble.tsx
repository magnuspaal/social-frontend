

import { Chat } from '@/types/chat';
import { User } from '@/types/user';

export default function ChatWritingBubble({sender, chat}: {sender: User, chat: Chat}) {

  return (
    <div className='flex flex-col left'>
      <div className={`text-[10px] font-normal mx-3 mt-2`}>{sender.username}</div>
      <div
        style={{wordBreak: 'break-word', overflowWrap: "break-word", 
          color: chat.chatSettings?.theirChatTextColor, 
          backgroundColor: chat.chatSettings?.theirChatBubbleColor}} 
        className='flex rounded bg-shade place-self-start px-4 py-2 mx-2'>     
        <p className='tracking-widest text-sm font-bold animate-bounce'>...</p>
      </div>
    </div>
  )
}