import Link from "next/link"
import { Chat } from "@/types/chat"
import ChatMessagePreview from "./ChatMessagePreview"

export default function ChatPreview({chat}: {chat: Chat}) {

  return (
    <Link href={`/chat/${chat.id}`} className="flex flex-row items-center flex-wrap justify-center p-4">
      <div className="flex flex-col grow w-full">
        {
          chat.users.map((user) => <div key={user.id} className="truncate font-bold">{user.username}</div>)
        }
        <ChatMessagePreview chatId={chat.id}/>
      </div>
    </Link>
  )
}