"use client"

import useChatBubbleStyle from '@/hooks/use-chat-bubble-style';
import { MeContext } from '@/services/me-provider';
import { useAppSelector } from '@/store/hooks';
import { ChatMessage } from '@/types/chat-message';
import { getMessageTimestamp } from '@/utils/date-utils';
import { useContext, useRef } from 'react';

export default function ChatBubble({message, chatId}: {message: ChatMessage, chatId: number}) {
  const { me } = useContext(MeContext)

  const container = useRef<HTMLDivElement>(null)
  const span = useRef<HTMLDivElement>(null)

  const isMe = message.sender.id == me?.id

  const prevMessage: ChatMessage = useAppSelector((state: any) => {
    return state.messaging.messages[chatId].find((foundMessage: ChatMessage) => {
      return foundMessage.chatMessageId + 1 == message.chatMessageId
    })
  });

  const [displayTimestamp, displayGap, displayUserName] = useChatBubbleStyle(
    prevMessage,
    message,
    span,
    container
  )

  return (
    <div ref={container} className={`flex my-[2px] flex-col`}>
      {displayTimestamp && <div className={`text-xs my-2 text-center w-full`}>{getMessageTimestamp(message.createdAt.toString())}</div>}
      {!displayTimestamp && displayGap && <div className={`my-2`}></div>}
      {displayUserName && <div className={`text-[10px] font-normal mx-3 ${isMe ? 'place-self-end' : 'place-self-start'}`}>{message.sender.username}</div>}
      <span
        style={{wordBreak: 'break-word', overflowWrap: "break-word"}} 
        className={`flex py-2 px-4 mx-2 min-w-0 text-sm rounded ${isMe ? 'bg-secondary place-self-end' : 'bg-shade place-self-start'}`}
        ref={span}
      >
        {message.content}
      </span>
    </div>
  )
}