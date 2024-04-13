"use client"

import { MeContext } from '@/providers/me-provider';
import { Chat } from '@/types/chat';
import { ChatMessage } from '@/types/chat/chat-message';
import { useContext, useEffect, useState } from 'react';
import { CSSTransition } from "react-transition-group";

export default function ChatBubbleFooter({message, chat}: {message: ChatMessage, chat: Chat}) {

  const { me } = useContext(MeContext)

  const [latestSeenMessageUsers, setLatestSeenMessageUsers] = useState<String>("")
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
    <CSSTransition in={display} onExited={() => setLatestSeenMessageUsers("")} timeout={800} classNames="message-slide">
      <div style={{color: chat.chatSettings?.textColor}} className="flex flex-col">
        <div className={`text-[10px] mx-4 text-right font-bold`}>{`${latestSeenMessageUsers}`}</div>
      </div>
    </CSSTransition>
  )
}