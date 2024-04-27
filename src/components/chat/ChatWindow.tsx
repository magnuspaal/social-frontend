

import { useContext, useEffect, useRef } from 'react';
import { addMessages } from "@/store/messaging-slice";
import ChatInput from './ChatInput';
import useMessagingService from '@/services/messaging-service';
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
import TransitionWrapper from '../common/TransitionWrapper';

export default function ChatWindow({chat}: {chat: Chat}) {

  useDisableScroll(true)

  const messagingService = useMessagingService()

  const chatWindowRef = useRef<HTMLDivElement>(null);

  const messageSelector = createSelector([(state) => state.messaging.messages], (messages) => {
    return messages.filter((message: ChatMessage) => message.chatId === chat.id)
  })

  const [messages,  endOfMessages] = useInfiniteScroll(
    messagingService.getChatMessages,
    messageSelector,
    addMessages,
    undefined,
    chatWindowRef,
    {id: chat.id, limit: 10}
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
    <div style={{background: chat.chatSettings?.backgroundColor}} className="sm:h-[70svh] h-full flex flex-col rounded">
      <ChatHeader color={chat.chatSettings?.textColor} iconColor={chat.chatSettings?.elementColor ?? "#503EC4"} chat={chat}/>
      <div className="overflow-y-scroll flex flex-col-reverse h-full w-full" ref={chatWindowRef}>
        <ChatWriting chat={chat}/>
        <TransitionGroup component={null}>   
          {messages?.map((message: ChatMessage) => 
            <TransitionWrapper key={message.id}>
              <CSSTransition in={message?.options?.animate} appear={message?.options?.animate} timeout={500} classNames="message-slide">
                <ChatBubbleHeader message={message} chat={chat}/>
              </CSSTransition>
              <CSSTransition in={message?.options?.animate} appear={message?.options?.animate} timeout={2000} classNames="message">
                <ChatBubble message={message} chat={chat} />
              </CSSTransition>
              <ChatBubbleFooter message={message} chat={chat} />
            </TransitionWrapper>
          )}
        </TransitionGroup>
        {!endOfMessages &&
          <div className="flex justify-center p-6"><span className="loader h-[30px] w-[30px]"></span></div>
        }
      </div>
      {client ? 
        <ChatInput chat={chat} client={client}/> : 
        <div className="flex justify-center p-6"><span className="loader"></span></div>
      }
    </div>
  )
}