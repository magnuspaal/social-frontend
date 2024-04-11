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
import ChatBubbleHeader from './chat-bubble/ChatBubbleHeader';
import ChatBubbleFooter from './chat-bubble/ChatBubbleFooter';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateChat } from '@/store/chat-slice';

export default function ChatWindow({propsChat}: {propsChat: Chat}) {

  useDisableScroll(true)

  const clientMessagingService = useClientMessagingService()

  const chatWindowRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch() 
  
  useEffect(() => {
    dispatch(updateChat(propsChat))
  }, [propsChat, dispatch])

  const messageSelector = createSelector([(state) => state.messaging.messages], (messages) => {
    return messages.filter((message: ChatMessage) => message.chatId === propsChat.id)
  })

  const chat = useAppSelector((state) => {
    return state.chat.chats.find((chat) => chat.id == propsChat.id) ?? propsChat
  })

  const [messages,  endOfMessages] = useInfiniteScroll(
    clientMessagingService.getChatMessages,
    messageSelector,
    addMessages,
    undefined,
    chatWindowRef,
    {id: propsChat.id, limit: 10}
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
              <ChatBubbleFooter message={message} chatUsers={chat.chatUsers} />
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