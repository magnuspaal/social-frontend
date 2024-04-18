

import { Chat } from '@/types/chat';
import ChatSvg from '../svg/ChatSvg';
import SettingsSvg from '../svg/SettingsSvg';
import { Link } from 'react-router-dom';

interface ChatHeaderElementProps {
  chat: Chat, 
  color: string | undefined,
  isChatSettings: boolean,
  iconColor: string
}

export default function ChatHeaderElement({chat, color, iconColor, isChatSettings}: ChatHeaderElementProps) {

  const usersString = chat?.chatUsers.map((chatUser) => chatUser.user.username).join(', ')
  return (
    <div className='flex p-3 justify-between'>
      <div style={{color: color}} className="mx-2 truncate font-bold">{usersString}</div>
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

