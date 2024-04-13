"use client"

import { useContext } from 'react';
import ChatBubble from '../chat-bubble/ChatBubble';
import { ChatMessage } from '@/types/chat/chat-message';
import { Chat } from '@/types/chat';
import { MeContext } from '@/providers/me-provider';
import ChatBubbleHeaderElement from '../chat-bubble/ChatBubbleHeaderElement';
import ChatBubbleFooter from '../chat-bubble/ChatBubbleFooter';

interface ChatSettingsDemoProps {
  myChatBubbleColor: string, 
  myChatTextColor: string, 
  theirChatBubbleColor: string, 
  theirChatTextColor: string,
  textColor: string
}

export default function ChatSettingsDemo({
  myChatBubbleColor,
  myChatTextColor, 
  theirChatBubbleColor, 
  theirChatTextColor, 
  textColor
}: ChatSettingsDemoProps) {

  const { me } = useContext(MeContext)
  
  const sender1 = {
    id: me?.id,
    username: "Paul"
  }

  const sender2 = {
    id: -1,
    username: "Tom"
  }

  const chat = {
    chatSettings: {
      myChatBubbleColor,
      myChatTextColor,
      theirChatBubbleColor,
      theirChatTextColor,
      textColor
    },
    chatUsers: [
      {
        user: sender2,
        latestSeenMessage: 3
      }
    ]
  } as Chat

  const message1 = {
    content: "Hey! How's it going?",
    createdAt: "2024-02-28T12:12:58Z",
    sender: sender1
  } as ChatMessage

  const message2 = {
    content: "Fine! How about you?",
    sender: sender2
  } as ChatMessage

  const message3 = {
    content: "I'm doing fine.",
    createdAt: "2024-02-28T12:13:30Z",
    sender: sender1,
    chatMessageId: 3
  } as ChatMessage

  const message4 = {
    content: "Thanks for asking!",
    sender: sender1
  } as ChatMessage

  return (
    <div className='flex flex-col w-full rounded-md'>
      <ChatBubbleHeaderElement message={message1} chat={chat} displayTimestamp={true} displayUsername={true}/>
      <ChatBubble message={message1} chat={chat}/>
      <ChatBubbleHeaderElement message={message2} chat={chat} displayUsername={true}/>
      <ChatBubble message={message2} chat={chat}/>
      <ChatBubbleHeaderElement message={message3} chat={chat} displayTimestamp={true} displayUsername={true}/>
      <ChatBubble message={message3} chat={chat}/>
      <ChatBubbleFooter message={message3} chat={chat}></ChatBubbleFooter>
      <ChatBubble message={message4} chat={chat}/>
    </div>
  )
}