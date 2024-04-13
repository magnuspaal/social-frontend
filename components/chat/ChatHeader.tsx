import { Chat } from '@/types/chat';
import { usePathname } from 'next/navigation';
import ChatHeaderElement from './ChatHeaderElement';

export default function ChatHeader({chat, color}: {chat: Chat, color: string | undefined}) {

  const pathname = usePathname()

  const isChatSettings = () => pathname.startsWith(`/chat/${chat.id}/settings`)

  if (chat) {
    return (
      <ChatHeaderElement chat={chat} color={color} isChatSettings={isChatSettings()}/>
    )
  } else {
    return <div className="flex justify-center p-3"><span className="loader h-[30px] w-[30px]"></span></div>
  }
}