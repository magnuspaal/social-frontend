'use client'

import { Chat } from '@/types/chat';
import Image from 'next/image'
import Link from 'next/link';
import ChatSvg from '../image/ChatSvg';
import SettingsSvg from '../image/SettingsSvg';

interface ChatHeaderElementProps {
  chat: Chat, 
  color: string | undefined,
  isChatSettings: boolean,
  iconColor?: string | undefined
}

export default function ChatHeaderElement({chat, color, iconColor, isChatSettings}: ChatHeaderElementProps) {

  const usersString = chat?.chatUsers.map((chatUser) => chatUser.user.username).join(', ')
  return (
    <div className='flex p-3 justify-between'>
      <div style={{color: color}} className="mx-2 truncate font-bold">{usersString}</div>
      <Link href={`/chat/${chat.id}${isChatSettings ? "" : "/settings"}`}>
        {
          isChatSettings ? 
            <ChatSvg color={iconColor ?? chat.chatSettings?.elementColor} />:
            <SettingsSvg color={iconColor ?? chat.chatSettings?.elementColor} />
        }
      </Link>
    </div>
  )
}

