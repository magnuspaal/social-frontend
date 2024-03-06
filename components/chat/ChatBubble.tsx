"use client"

import { ChatMessage } from '@/types/chat-message';
import { User } from '@/types/user';
import { getMessageTimestamp } from '@/utils/date-utils';

export default function ChatWindow({message, me}: {message: ChatMessage, me: User}) {

  const isMe = message.user.id == me.id

  return (
    <div className={`my-1 mx-2 ${isMe ? 'self-end' : 'self-start'}`}>
      <div className={`text-xs ${isMe ? 'text-right' : 'text-left'}`}>{getMessageTimestamp(message.createdAt.toString())}</div>
      <div className={`p-4 rounded flex ${isMe ? 'bg-secondary ml-10' : 'bg-shade mr-10'}`}>
        {message.content}
      </div>
    </div>
  )
}