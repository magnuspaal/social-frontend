import { MeContext } from '@/providers/me-provider';
import { Chat } from '@/types/chat';
import { ChatMessage } from '@/types/chat/chat-message';
import { useContext } from 'react';

export default function TextBubble({message, chat}: {message: ChatMessage, chat: Chat}) {
  const { me } = useContext(MeContext)
  const isMe = message.sender.id == me?.id

  const myColor = chat.chatSettings?.myChatBubbleColor
  const myTextColor = chat.chatSettings?.myChatTextColor

  const theirColor = chat.chatSettings?.theirChatBubbleColor
  const theirTextColor = chat.chatSettings?.theirChatTextColor

  return (
    <div
      style={{
        wordBreak: "break-word", 
        background: `${isMe ? myColor : theirColor}`, 
        color: `${isMe ? myTextColor : theirTextColor}`
      }} 
      className={`flex max-w-[60%] rounded-md sm:text-sm px-4 py-2 mx-2 shadow-light ${isMe ? `place-self-end bg-secondary` : 'place-self-start bg-shade'}`}>
        {message.content}
    </div>
  )
}