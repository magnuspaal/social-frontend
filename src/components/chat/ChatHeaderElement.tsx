

import { Chat } from '@/types/chat';
import ChatSvg from '../svg/ChatSvg';
import SettingsSvg from '../svg/SettingsSvg';
import { Link } from 'react-router-dom';
import ChatUsersList from './ChatUsersList';

interface ChatHeaderElementProps {
  chat: Chat, 
  color: string | undefined,
  isChatSettings: boolean,
  iconColor: string
}

export default function ChatHeaderElement({chat, color, iconColor, isChatSettings}: ChatHeaderElementProps) {

  return (
    <div className='flex p-3 justify-between'> 
      <ChatUsersList chat={chat} color={color} iconColor={iconColor} className='truncate mx-2 font-bold flex flex-wrap gap-2'/>
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

