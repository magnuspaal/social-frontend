import Link from "next/link"
import { Chat } from "@/types/chat"
import ChatMessagePreview from "./ChatMessagePreview"

export default async function ChatPreview({chat}: {chat: Chat}) {

  const usersString = chat.chatUsers.map((chatUser) => chatUser.user.username).join(', ')

  return (
    <Link href={`/chat/${chat.id}`} className="flex flex-row items-center flex-wrap justify-center p-4">
      <div className="flex flex-col grow w-full">
        <div className="truncate font-semibold text-sm mb-1">{usersString}</div>
        <ChatMessagePreview chat={chat}/>
      </div>
    </Link>
  )
}