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

export default function ChatWindow({chatId}: {chatId: number}) {
  
  const router = useRouter()

  useDisableScroll(true)

  const clientMessagingService = useClientMessagingService()
  const client = useMessagingClient()

  const chatWindowRef = useRef<HTMLDivElement>(null);

  const [subscription, setSubscription] = useState<StompSubscription>()
  const [loading, setLoading] = useState<boolean>(true)
  const [privateKey, setPrivateKey] = useState<string | null>()

  const [messages] = useInfiniteScroll(
    clientMessagingService.getChatMessages,
    (state: any) => {
      return state.messaging.messages[chatId]
    },
    addMessages,
    undefined,
    chatWindowRef,
    {id: chatId, limit: 20}
  )

  useMessagingHandler(
    client,
    subscription,
    setSubscription,
    setPrivateKey,
    setLoading
  )

  if (loading) {
    return (
      <div className="flex justify-center p-6"> 
        <span className="loader"></span>
      </div>
    ) 
  } else if (!privateKey) {
    router.push(`/chat/${chatId}/auth`)
  } else {
    return (
    <div className="sm:h-[70svh] h-full flex flex-col">
      <div>{}</div>
      <div className="overflow-y-auto flex flex-col-reverse h-full w-full" ref={chatWindowRef}>        
        {messages?.map((message: any) => 
          <ChatBubble key={message.id} message={message} chatId={chatId} />
        )}
      </div>
      {client && <ChatInput chatId={chatId} client={client}/>}
    </div>
    )
  }
}