

import { MeContext } from '@/providers/me-provider';
import { Chat } from '@/types/chat';
import { ChatMessage } from '@/types/chat/chat-message';
import { getMessageTimestamp } from '@/utils/date-utils';
import { useContext } from 'react';

interface ChatBubbleHeaderElementProps {
  message: ChatMessage,
  chat: Chat,
  displayTimestamp?: boolean,
  displayGap?: boolean,
  displayUsername?: boolean
}

export default function ChatBubbleHeaderElement({message, chat, displayTimestamp, displayGap, displayUsername}: ChatBubbleHeaderElementProps) {
  const { me } = useContext(MeContext)

  const isMe = message.sender.id == me?.id

  return (
    <div style={{color: chat.chatSettings?.textColor}} className="flex flex-col">
      {displayTimestamp && <div className={`text-xs text-center w-full my-2`}>{getMessageTimestamp(message.createdAt.toString())}</div>}
      {!displayTimestamp && displayGap && <div className='my-2'></div>}
      {displayUsername && <div className={`text-[10px] font-normal mx-3  ${isMe ? 'place-self-end' : 'place-self-start'}`}>{message.sender.username}</div>}
    </div>
  )
}