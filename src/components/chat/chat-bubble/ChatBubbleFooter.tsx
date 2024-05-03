import { MeContext } from '@/providers/me-provider';
import { Chat } from '@/types/chat';
import { ChatMessage } from '@/types/chat/chat-message';
import { useContext, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function ChatBubbleFooter({message, chat, initialUser}: {message: ChatMessage, chat: Chat, initialUser?: string}) {

  const { me } = useContext(MeContext)
  const divRef = useRef<HTMLDivElement>(null)

  const isMyMessage = () => message.sender.id == me?.id

  const [latestSeenMessageUsers, setLatestSeenMessageUsers] = useState<string>(initialUser ?? "")
  const [display, setDisplay] = useState<boolean>(false)

  useEffect(() => {
    const latestSeenUsers = chat.chatUsers
      .filter((chatUser) => chatUser.latestSeenMessage == message.chatMessageId && chatUser.user.id != me?.id)
      .map((user) => user.user.username)
      .join(", ")
     
    setDisplay(latestSeenUsers.length != 0)

    if (latestSeenUsers.length > 0) {
      setLatestSeenMessageUsers(latestSeenUsers)
    }
  }, [chat])

  return (
    <CSSTransition nodeRef={divRef} in={display} enter={!!message.options?.animate} onExited={() => setLatestSeenMessageUsers("")} timeout={800} classNames="message-slide">
      <div ref={divRef} style={{color: chat.chatSettings?.elementColor}} className={`flex flex-col ${isMyMessage() ? 'text-right' : 'text-left'}`}>
        <div className={`text-[11px] mx-3 font-bold`}>{`${latestSeenMessageUsers}`}</div>
      </div>
    </CSSTransition>
  )
}