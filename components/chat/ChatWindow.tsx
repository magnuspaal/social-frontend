"use client"

import { useContext, useEffect, useRef } from 'react';
import { addMessages } from "@/store/messaging-slice";
import ChatInput from './ChatInput';
import useClientMessagingService from '@/services/client/client-messaging-service';
import useInfiniteScroll from '@/hooks/use-infinite-scroll';
import ChatBubble from './chat-bubble/ChatBubble';
import useDisableScroll from '@/hooks/use-disable-scroll';
import ChatHeader from './ChatHeader';
import { Chat } from '@/types/chat';
import { MessagingClientContext } from '@/providers/messaging-client-provider';
import { ChatMessage } from '@/types/chat/chat-message';
import { createSelector } from '@reduxjs/toolkit';
import ChatWriting from './chat-bubble/ChatWriting';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ChatBubbleHeader from './chat-bubble/ChatBubbleHeader';
import ChatBubbleFooter from './chat-bubble/ChatBubbleFooter';
import { serverRevalidateTag } from '@/server-action/revalidate';

export default function ChatWindow({chat}: {chat: Chat}) {

  useDisableScroll(true)

  const clientMessagingService = useClientMessagingService()

  const chatWindowRef = useRef<HTMLDivElement>(null);

  const messageSelector = createSelector([(state) => state.messaging.messages], (messages) => {
    return messages.filter((message: ChatMessage) => message.chatId === chat.id)
  })

  const [messages,  endOfMessages] = useInfiniteScroll(
    clientMessagingService.getChatMessages,
    messageSelector,
    addMessages,
    undefined,
    chatWindowRef,
    {id: chat.id, limit: 10}
  )

  const { client } = useContext(MessagingClientContext)

  useEffect(() => {
    serverRevalidateTag("chats")
  }, [])

  useEffect(() => {
    if (messages) {
      if (chatWindowRef.current && -chatWindowRef.current.scrollTop < 100) {
        chatWindowRef.current.scrollTo({top: 0});
      }
    }
  }, [messages])

  return (
    <div className="sm:h-[70svh] h-full flex flex-col">
      <ChatHeader chat={chat}/>
      <div className="overflow-y-scroll flex flex-col-reverse h-full w-full" ref={chatWindowRef}>
        <TransitionGroup component={null}>    
          <ChatWriting chat={chat}/>
          {messages?.map((message: ChatMessage) => 
            <div key={message.id}>
              <CSSTransition in={message?.options?.animate} appear={message?.options?.animate} timeout={500} classNames="message-slide">
                <ChatBubbleHeader message={message}/>
              </CSSTransition>
              <CSSTransition in={message?.options?.animate} appear={message?.options?.animate} timeout={500} classNames="message">
                <ChatBubble message={message} />
              </CSSTransition>
              <ChatBubbleFooter message={message} chat={chat} />
            </div>
          )}
        </TransitionGroup>
        {!endOfMessages &&
            <div className="flex justify-center p-6"><span className="loader h-[30px] w-[30px]"></span></div>
          }
      </div>
      {client ? 
        <ChatInput chatId={chat.id} client={client}/> : 
        <div className="flex justify-center p-6"><span className="loader"></span></div>
      }
    </div>
  )
}