"use client"

import { useContext, useEffect, useRef, useState } from 'react';
import { addMessages } from "@/store/messaging-slice";
import ChatInput from './ChatInput';
import useClientMessagingService from '@/services/client/client-messaging-service';
import useInfiniteScroll from '@/hooks/use-infinite-scroll';
import ChatBubble from './ChatBubble';
import useDisableScroll from '@/hooks/use-disable-scroll';
import ChatHeader from './ChatHeader';
import { Chat } from '@/types/chat';
import { MessagingClientContext } from '@/providers/messaging-client-provider';

export default function ChatWindow({chat}: {chat: Chat}) {

  useDisableScroll(true)

  const clientMessagingService = useClientMessagingService()

  const chatWindowRef = useRef<HTMLDivElement>(null);

  const [messages,  endOfMessages] = useInfiniteScroll(
    clientMessagingService.getChatMessages,
    (state: any) => {
      return state.messaging.messages[chat.id]
    },
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
        {messages?.map((message: any) => 
          <ChatBubble key={message.id} message={message} chatId={chat.id} />
        )}
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