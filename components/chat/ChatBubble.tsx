"use client"

import { MeContext } from '@/services/me-provider';
import { ChatMessage } from '@/types/chat-message';
import { getMessageTimestamp } from '@/utils/date-utils';
import { useContext } from 'react';

export default function ChatWindow({message}: {message: ChatMessage}) {

  const { me } = useContext(MeContext)

  const isMe = message.user.id == me?.id

  return (
    <div className={`my-1 mx-2 ${isMe ? 'self-end' : 'self-start'}`}>
      <div className={`text-xs ${isMe ? 'text-right' : 'text-left'}`}>{getMessageTimestamp(message.createdAt.toString())}</div>
      <div className={`p-4 rounded flex ${isMe ? 'bg-secondary ml-10' : 'bg-shade mr-10'}`}>
        {message.content}
      </div>
    </div>
  )
}