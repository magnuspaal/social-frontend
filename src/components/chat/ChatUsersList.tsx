import { Chat } from '@/types/chat';
import { useAppSelector } from '@/store/hooks';
import { useContext } from 'react';
import { MeContext } from '@/providers/me-provider';
import { hexToRgbA } from '@/utils/color-utils';

interface ChatUsersListProps {
  chat: Chat, 
  color: string | undefined,
  iconColor: string,
  className: string
}

export default function ChatUsersList({chat, color, iconColor, className}: ChatUsersListProps) {

  const activeUsers = useAppSelector((state) => state.messaging.activeUsers)
  const { me } = useContext(MeContext)
  const users = chat?.chatUsers.filter((chatUser) => chatUser.user.id != me?.id).map((chatUser) => chatUser.user)

  return (
    <div style={{color: color}} className={`${className}`}>
      {users.map((user) => {
        return (
          <div key={user.id} className='flex justify-center items-center gap-1'>
            {activeUsers.includes(user.id) 
              ? <div style={{backgroundColor: iconColor}} className='rounded-full w-3 h-3'></div>
              : <div style={{borderColor: hexToRgbA(color ?? "#000", 0.6)}} className='rounded-full border w-3 h-3'></div>
            }
            <p>{user.username}</p>
          </div>
        )
      })}
    </div>
  )
}

