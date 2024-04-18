

import { MeContext } from '@/providers/me-provider';
import { Chat } from '@/types/chat';
import { ChatMessage } from '@/types/chat/chat-message';
import { useContext } from 'react';

export default function ChatBubble({message, chat}: {message: ChatMessage, chat: Chat}) {
  const { me } = useContext(MeContext)

  const isMe = message.sender.id == me?.id

  const myColor = chat.chatSettings?.myChatBubbleColor
  const myTextColor = chat.chatSettings?.myChatTextColor

  const theirColor = chat.chatSettings?.theirChatBubbleColor
  const theirTextColor = chat.chatSettings?.theirChatTextColor

  return (
    <div className={`flex flex-col my-[2px] ${isMe ? 'right' : 'left'}`}>
      <div
        style={{
          wordBreak: "break-word", 
          background: `${isMe ? myColor : theirColor}`, 
          color: `${isMe ? myTextColor : theirTextColor}`,
          boxShadow: `rgba(0,0,0,0.05) 0px 1px 2px 0px`
        }} 
        className={`flex max-w-[60%] text-sm rounded-md px-4 py-2 mx-2 ${isMe ? `place-self-end bg-secondary` : 'place-self-start bg-shade'}`}>
          {message.content}
      </div>
    </div>
  )
}