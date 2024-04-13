"use client"

import useChatBubbleStyle from '@/hooks/chat/use-chat-bubble-style';
import { ChatMessage } from '@/types/chat/chat-message';
import ChatBubbleHeaderElement from './ChatBubbleHeaderElement';
import { Chat } from '@/types/chat';

export default function ChatBubbleHeader({message, chat}: {message: ChatMessage, chat: Chat}) {
  const [displayTimestamp, displayGap, displayUsername] = useChatBubbleStyle(message)

  return (
    <ChatBubbleHeaderElement message={message} chat={chat} displayTimestamp={displayTimestamp} displayGap={displayGap} displayUsername={displayUsername}/>
  )
}