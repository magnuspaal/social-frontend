"use client"

import { User } from '@/types/user';

export default function ChatWritingBubble({sender}: {sender: User}) {

  return (
    <div className='flex flex-col left'>
      <div className={`text-[10px] font-normal mx-3 mt-2`}>{sender.username}</div>
      <div
        style={{wordBreak: 'break-word', overflowWrap: "break-word"}} 
        className='flex rounded bg-shade place-self-start px-4 py-2 mx-2'>     
        <p className='tracking-widest text-sm font-bold animate-bounce'>...</p>
      </div>
    </div>
  )
}