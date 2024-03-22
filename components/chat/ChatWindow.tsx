"use client"

import { useEffect, useRef, useState } from 'react';

import { addMessage, addMessages } from "@/store/messaging-slice";

import {StompSubscription} from "@stomp/stompjs";

import { User } from '@/types/user';
import { useAppDispatch } from '@/store/hooks';
import ChatInput from './ChatInput';
import useClientMessagingService from '@/services/client/client-messaging-service';
import useInfiniteScroll from '@/hooks/use-infinite-scroll';
import useMessagingClient from '@/hooks/use-messaging-client';
import ChatBubble from './ChatBubble';
import useDisableScroll from '@/hooks/use-disable-scroll';

export default function ChatWindow({me, chatId, dict}: {me: User, chatId: number, dict: any}) {
  
  const dispatch = useAppDispatch()
  const [subscription, setSubscription] = useState<StompSubscription>()

  useDisableScroll(true)

  const clientMessagingService = useClientMessagingService()
  const client = useMessagingClient()

  const chatWindowRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (client && !subscription) {
      const stompSubscription = client.subscribe('/user/topic/message', message => {
        dispatch(addMessage(JSON.parse(message.body)))
      })
      setSubscription(stompSubscription)
    }

  }, [client, dispatch, subscription])

  return (
    <div className="h-[70svh] flex flex-col">
      <div>{}</div>
      <div className="overflow-y-auto flex flex-col-reverse h-full" ref={chatWindowRef}>        
        {messages?.map((message: any) => 
          <ChatBubble key={message.id} message={message} me={me}/>
        )}
      </div>
      {client && <ChatInput me={me} chatId={chatId} client={client}/>}
    </div>
  )
}