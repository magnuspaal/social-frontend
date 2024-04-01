import { Chat } from '@/types/chat';

export default function ChatHeader({chat}: {chat: Chat | null}) {

  const usersString = chat?.users.map((user) => user.username).join(', ')

  if (chat) {
    return (
      <div className='flex p-2 border-b-2'>
        <div className="mx-2 truncate font-bold">{usersString}</div>
      </div>
    )
  } else {
    return <div className="flex justify-center p-3"><span className="loader h-[30px] w-[30px]"></span></div>
  }
}