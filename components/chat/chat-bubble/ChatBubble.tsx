"use client"

import { MeContext } from '@/providers/me-provider';
import { ChatMessage } from '@/types/chat/chat-message';
import { useContext } from 'react';

export default function ChatBubble({message}: {message: ChatMessage}) {
  const { me } = useContext(MeContext)

  const isMe = message.sender.id == me?.id

  return (
    <div className={`flex flex-col my-[2px] ${isMe ? 'right' : 'left'}`}>
      <div style={{wordBreak: "break-word"}} className={`flex max-w-[60%] text-sm rounded px-4 py-2 mx-2 ${isMe ? 'bg-secondary place-self-end' : 'bg-shade place-self-start'}`}>
        {message.content}
      </div>
    </div>
  )
}