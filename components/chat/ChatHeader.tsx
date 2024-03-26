"use client"

import { Chat } from '@/types/chat';

export default function ChatHeader({chat}: {chat: Chat | null}) {
  if (chat) {
    return (
      <div className='flex p-2 border-b-2'>
        {chat.users.map((user) => {
          return <div key={user.id} className="mx-2 max-sm:truncate font-bold">{user.username}</div>
        })}
      </div>
    )
  } else {
    return <div className="flex justify-center p-3"><span className="loader h-[30px] w-[30px]"></span></div>
  }
}