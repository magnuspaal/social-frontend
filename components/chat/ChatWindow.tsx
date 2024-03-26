"use client"

import { useRef, useState } from 'react';
import { addMessages } from "@/store/messaging-slice";
import {StompSubscription} from "@stomp/stompjs";
import ChatInput from './ChatInput';
import useClientMessagingService from '@/services/client/client-messaging-service';
import useInfiniteScroll from '@/hooks/use-infinite-scroll';
import useMessagingClient from '@/hooks/use-messaging-client';
import ChatBubble from './ChatBubble';
import useDisableScroll from '@/hooks/use-disable-scroll';
import { useRouter } from 'next/navigation';
import useMessagingHandler from '@/hooks/use-messaging-handler';
import ChatHeader from './ChatHeader';
import { Chat } from '@/types/chat';

export default function ChatWindow({chat}: {chat: Chat}) {
  
  const router = useRouter()

  useDisableScroll(true)

  const clientMessagingService = useClientMessagingService()

  const chatWindowRef = useRef<HTMLDivElement>(null);

  const [subscription, setSubscription] = useState<StompSubscription>()
  const [loading, setLoading] = useState<boolean>(true)
  const [privateKey, setPrivateKey] = useState<string | null>()

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

  const client = useMessagingClient()

  useMessagingHandler(
    client,
    subscription,
    setSubscription,
    setPrivateKey,
    setLoading,
    chatWindowRef
  )

  if (loading) {
    return (
      <div className="flex justify-center p-6"> 
        <span className="loader"></span>
      </div>
    ) 
  } else if (!privateKey) {
    router.push(`/chat/${chat.id}/auth`)
  } else {
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
}