

import { Chat } from '@/types/chat';
import ChatSvg from '../svg/ChatSvg';
import SettingsSvg from '../svg/SettingsSvg';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { useContext } from 'react';
import { MeContext } from '@/providers/me-provider';

interface ChatHeaderElementProps {
  chat: Chat, 
  color: string | undefined,
  isChatSettings: boolean,
  iconColor: string
}

export default function ChatHeaderElement({chat, color, iconColor, isChatSettings}: ChatHeaderElementProps) {

  const activeUsers = useAppSelector((state) => state.messaging.activeUsers)

  const { me } = useContext(MeContext)

  const users = chat?.chatUsers.filter((chatUser) => chatUser.user.id != me?.id).map((chatUser) => chatUser.user)

  return (
    <div className='flex p-3 justify-between'>
      <div style={{color: color}} className="mx-2 truncate font-bold flex flex-wrap gap-2">
        {users.map((user) => {
          return (
            <div key={user.id} className='flex justify-center items-center gap-1'>
              {activeUsers.includes(user.id) 
                ? <div style={{backgroundColor: iconColor}} className='rounded-full w-3 h-3'></div>
                : <div className='rounded-full border border-black/60 w-3 h-3'></div>
              }
              <p>{user.username}</p>
            </div>
          )
        })}
      </div>
      <Link to={`/chat/${chat.id}${isChatSettings ? "" : "/settings"}`}>
        {
          isChatSettings ? 
            <ChatSvg color={iconColor} />:
            <SettingsSvg color={iconColor} />
        }
      </Link>
    </div>
  )
}

