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
import { ChatMessage } from '@/types/chat-message';
import { createSelector } from '@reduxjs/toolkit';
import ChatWriting from './chat-bubble/ChatWriting';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ChatBubbleInfo from './chat-bubble/ChatBubbleInfo';

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
    {id: chat.id, limit: 20}
  )

  const { client } = useContext(MessagingClientContext)

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
      <div className="overflow-y-auto flex flex-col-reverse h-full w-full" ref={chatWindowRef}>
        <TransitionGroup  component={null}>    
          <ChatWriting chat={chat}/>
          {messages?.map((message: any) => 
            <div key={message.id}>
              <CSSTransition
              in={true}
              appear={true}
              timeout={2000}
              classNames="message-slide">
                <ChatBubbleInfo message={message}/>
              </CSSTransition>
              <CSSTransition
                in={true}
                appear={true}
                timeout={2000}
                classNames="message">
                <ChatBubble message={message} />
              </CSSTransition>
            </div>
          )}
          {!endOfMessages &&
            <div className="flex justify-center p-6"><span className="loader h-[30px] w-[30px]"></span></div>
          }
        </TransitionGroup>
      </div>
      
      {client ? 
        <ChatInput chatId={chat.id} client={client}/> : 
        <div className="flex justify-center p-6"><span className="loader"></span></div>
      }
    </div>
  )
}