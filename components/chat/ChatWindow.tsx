"use client"

import { useEffect, useRef, useState } from 'react';

import { addMessage, addMessages, initChatMessages } from "@/store/messaging-slice";

import {StompSubscription} from "@stomp/stompjs";

import { User } from '@/types/user';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import ChatInput from './ChatInput';
import useClientMessagingApiService from '@/services/client-messaging-service';
import useInfiniteScroll from '@/hooks/use-infinite-scroll';
import useMessagingClient from '@/hooks/use-messaging-client';
import ChatBubble from './ChatBubble';
import useDisableScroll from '@/hooks/use-disable-scroll';

export default function ChatWindow({me, chatId, dict}: {me: User, chatId: number, dict: any}) {
  
  const dispatch = useAppDispatch()
  const [subscription, setSubscription] = useState<StompSubscription>()

  useDisableScroll(true)

  const clientMessagingApiService = useClientMessagingApiService()
  const client = useMessagingClient()

  const chatWindowRef = useRef<HTMLDivElement>(null);

  const [messages] = useInfiniteScroll(
    clientMessagingApiService.getChatMessages,
    (state: any) => {
      return state.messaging.messages[chatId]
    },
    initChatMessages,
    addMessages,
    chatWindowRef,
    {id: chatId, limit: 20}
  )

  useEffect(() => {
    if (client && !subscription) {
      const stompSubscription = client.subscribe('/user/topic/message', message => {
        console.log(JSON.parse(message.body))
        dispatch(addMessage(JSON.parse(message.body)))
      })
      setSubscription(stompSubscription)
    }

  }, [client, dispatch, subscription])

  return (
    <div className="h-[70svh] flex flex-col">
      <div>{}</div>
      <div className="overflow-y-auto flex flex-col-reverse" ref={chatWindowRef}>        
        {messages?.map((message: any) => 
          <ChatBubble key={message.id} message={message} me={me}/>
        )}
      </div>
      {client && <ChatInput me={me} chatId={chatId} client={client} dict={dict}/>}
    </div>
  )
}