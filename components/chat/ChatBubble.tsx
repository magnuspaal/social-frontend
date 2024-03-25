"use client"

import { MeContext } from '@/services/me-provider';
import { useAppSelector } from '@/store/hooks';
import { ChatMessage } from '@/types/chat-message';
import { compareMessageTimeStamps, getMessageTimestamp } from '@/utils/date-utils';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

export default function ChatBubble({message, chatId}: {message: ChatMessage, chatId: number}) {
  const { me } = useContext(MeContext)

  const container = useRef<HTMLDivElement>(null)
  const span = useRef<HTMLDivElement>(null)
  const range = document.createRange()

  const isMe = message.sender.id == me?.id
  const [displayTimestamp, setDisplayTimestamp] = useState<boolean>(true)
  const [displayGap, setDisplayGap] = useState<boolean>(false);

  const prevMessage: ChatMessage = useAppSelector((state: any) => {
    return state.messaging.messages[chatId].find((foundMessage: ChatMessage) => {
      return foundMessage.chatMessageId + 1 == message.chatMessageId
    })
  });

  useEffect(() => {
    if (prevMessage) {
      const diffInSconds = compareMessageTimeStamps(prevMessage.createdAt, message.createdAt)
      setDisplayTimestamp(diffInSconds > 60 * 5)
      setDisplayGap(diffInSconds > 30)
    }
    findWidth()
  }, [])

  const findWidth = useCallback(() => {
    const text = span.current?.childNodes[0];

    if (text && container.current && container.current?.offsetWidth - span.current?.offsetWidth <= 16 ) {
      range.setStartBefore(text);
      range.setEndAfter(text);
  
      const clientRect = range.getBoundingClientRect();
      span.current.style.width = `${clientRect.width}px`;
    }
  }, [range])

  useEffect(() => {
    if (container.current) {
      const observer = new ResizeObserver(entries => {
        findWidth()
      })
      observer.observe(container.current)
    }
  }, [container, findWidth, range])

  return (
    <div ref={container} className={`flex my-[2px] flex-col`}>
      {displayTimestamp && <div className={`text-xs my-2 text-center w-full`}>{getMessageTimestamp(message.createdAt.toString())}</div>}
      {!displayTimestamp && displayGap && <div className={`my-2`}></div>}
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