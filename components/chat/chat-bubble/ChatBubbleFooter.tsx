"use client"

import { MeContext } from '@/providers/me-provider';
import { ChatMessage } from '@/types/chat-message';
import { ChatUser } from '@/types/chat-user';
import { useContext, useEffect, useState } from 'react';
import { CSSTransition } from "react-transition-group";

export default function ChatBubbleFooter({message, chatUsers}: {message: ChatMessage, chatUsers: ChatUser[]}) {

  const { me } = useContext(MeContext)

  const [latestSeenMessageUsers, setLatestSeenMessageUsers] = useState<String>("")
  const [display, setDisplay] = useState<boolean>(false)

  useEffect(() => {
    setLatestSeenMessageUsers(chatUsers
      .filter((chatUser) => chatUser.latestSeenMessage == message.chatMessageId && chatUser.user.id != me?.id)
      .map((user) => user.user.username)
      .join(", "))
    setDisplay(!!latestSeenMessageUsers)
  }, [chatUsers, latestSeenMessageUsers, me?.id, message.chatMessageId])
 
  return (
    <CSSTransition in={display} appear={true} timeout={2000} classNames="message-slide">
      <div className="flex flex-col">
        {latestSeenMessageUsers.length > 0 && <div className={`text-[10px] my-[2px] mx-4 text-right font-bold`}>{`${latestSeenMessageUsers}`}</div>}
      </div>
    </CSSTransition>
  )
}