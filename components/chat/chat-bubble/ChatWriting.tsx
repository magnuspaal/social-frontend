"use client"

import { useAppSelector } from '@/store/hooks';
import { Chat } from '@/types/chat';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';

export default function ChatWriting({chat}: {chat: Chat}) {

  const writing = useAppSelector((state) => state.messaging.writingMessage)

  const [senders, setSenders] = useState<User[]>([])
 
  useEffect(() => {
    if (Object.keys(writing).includes(chat.id.toString())) {
      const array = writing[chat.id]
      if (array) {
        setSenders(array)
      }
    }
  }, [writing])

  return (
    <div>
    {
      senders.map((sender: User) => {
        return (
          <div key={sender.id} className='flex mt-4 flex-col'>
            <div className={`text-[10px] font-normal mx-3 appear-slide`}>{sender.username}</div>
            <span
              style={{wordBreak: 'break-word', overflowWrap: "break-word"}} 
              className='flex py-2 px-4 mx-2 min-w-0 rounded bg-shade place-self-start appear-size'
            >
              <span className='animate-bounce tracking-widest text-sm font-bold'>...</span>
            </span>
          </div>
        )
      })
    }
    </div>
  )
}