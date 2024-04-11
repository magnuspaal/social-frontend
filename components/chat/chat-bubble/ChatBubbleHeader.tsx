"use client"

import useChatBubbleStyle from '@/hooks/chat/use-chat-bubble-style';
import { MeContext } from '@/providers/me-provider';
import { ChatMessage } from '@/types/chat-message';
import { getMessageTimestamp } from '@/utils/date-utils';
import { useContext } from 'react';

export default function ChatBubbleHeader({message}: {message: ChatMessage}) {
  const { me } = useContext(MeContext)

  const isMe = message.sender.id == me?.id

  const [displayTimestamp, displayGap, displayUserName] = useChatBubbleStyle(message)

  return (
    <div className="flex flex-col">
      {displayTimestamp && <div className={`text-xs text-center w-full my-2`}>{getMessageTimestamp(message.createdAt.toString())}</div>}
      {!displayTimestamp && displayGap && <div className='my-2'></div>}
      {displayUserName && <div className={`text-[10px] font-normal mx-3  ${isMe ? 'place-self-end' : 'place-self-start'}`}>{message.sender.username}</div>}
    </div>
  )
}