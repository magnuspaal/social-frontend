

import { MeContext } from '@/providers/me-provider';
import { Chat } from '@/types/chat';
import { ChatMessage } from '@/types/chat/chat-message';
import { ChatMessageType } from '@/types/chat/chat-message/chat-message-type';
import { useContext, useState } from 'react';
import TextBubble from './TextBubble';
import ImageBubble from './ImageBubble';
import useLongPress from '@/hooks/use-long-press';
import ChatBubbleReactions from './ChatBubbleReactions';

export default function ChatBubble({message, chat, notClickable}: {message: ChatMessage, chat: Chat, notClickable?: boolean}) {
  const { me } = useContext(MeContext)
  const isMe = message.sender.id == me?.id

  const [reactionSelectorShown, setReactionSelectorShown] = useState<boolean>(false)

  const onLongPress = () => {
    if (!notClickable) setReactionSelectorShown(!reactionSelectorShown)
  };

  const onClick = () => {}

  const defaultOptions = {
      shouldPreventDefault: true,
      delay: 500,
  };

  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  const renderChatBubble = () => {
    if (message.type == ChatMessageType.TEXT) {
      return <TextBubble message={message} chat={chat}/>
    } else if (message.type == ChatMessageType.IMAGE) {
      return <ImageBubble message={message} chat={chat} />
    }
  }

  return (
    <div className={`flex flex-col my-[2px] select-none not-selectable ${isMe ? 'right' : 'left'}`}>
      <div {...longPressEvent} className={`flex max-w-[60%] relative ${message.messageReactions.length && "mb-5"} ${isMe ? `place-self-end` : 'place-self-start'}`}>
        {renderChatBubble()}
        <ChatBubbleReactions message={message} reactionSelectorShown={reactionSelectorShown} setReactionSelectorShown={setReactionSelectorShown}/>
      </div>
    </div>
  )
}