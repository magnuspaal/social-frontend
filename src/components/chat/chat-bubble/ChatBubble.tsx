

import { MeContext } from '@/providers/me-provider';
import { Chat } from '@/types/chat';
import { ChatMessage } from '@/types/chat/chat-message';
import { ChatMessageType } from '@/types/chat/chat-message/chat-message-type';
import { useContext } from 'react';
import TextBubble from './TextBubble';
import ImageBubble from './ImageBubble';

export default function ChatBubble({message, chat}: {message: ChatMessage, chat: Chat}) {
  const { me } = useContext(MeContext)
  const isMe = message.sender.id == me?.id

  const renderChatBubble = () => {
    if (message.type == ChatMessageType.TEXT) {
      return <TextBubble message={message} chat={chat}/>
    } else if (message.type == ChatMessageType.IMAGE) {
      return <ImageBubble message={message} />
    }
  }

  return (
    <div className={`flex flex-col my-[2px] ${isMe ? 'right' : 'left'}`}>
      {renderChatBubble()}
    </div>
  )
}