"use client"

import useChatBubbleStyle from '@/hooks/use-chat-bubble-style';
import { MeContext } from '@/providers/me-provider';
import { ChatMessage } from '@/types/chat-message';
import { getMessageTimestamp } from '@/utils/date-utils';
import { useContext, useRef } from 'react';

export default function ChatBubble({message}: {message: ChatMessage}) {
  const { me } = useContext(MeContext)

  const container = useRef<HTMLDivElement>(null)
  const span = useRef<HTMLDivElement>(null)

  const isMe = message.sender.id == me?.id

  const [displayTimestamp, displayGap, displayUserName] = useChatBubbleStyle(message)

  return (
    <div ref={container} className='flex my-[2px] flex-col'>
      {displayTimestamp && <div className='text-xs my-2 text-center w-full appear-slide'>{getMessageTimestamp(message.createdAt.toString())}</div>}
      {!displayTimestamp && displayGap && <div className='my-2 appear-size'></div>}
      {displayUserName && <div className={`text-[10px] font-normal mx-3 appear-slide ${isMe ? 'place-self-end' : 'place-self-start'}`}>{message.sender.username}</div>}
      <span
        style={{overflowWrap: 'anywhere'}} 
        className={`flex py-2 px-4 mx-2 max-w-[60%] text-sm rounded appear-size ${isMe ? 'bg-secondary place-self-end' : 'bg-shade place-self-start'}`}
        ref={span}
      >
        {message.content}
      </span>
    </div>
  )
}