import Link from "next/link"
import { Chat } from "@/types/chat"

interface ChatPreviewProps {
  chat: Chat
}

export default function ChatPreview({chat}: ChatPreviewProps) {

  return (
    <Link href={`/chat/${chat.id}`} className="flex flex-row items-center flex-wrap justify-center p-4">
      <div className="flex flex-column grow">
        {
          chat.users.map((user) => {
            return <div key={user.id} className="mx-2 max-sm:truncate">{user.username}</div>
          })
        }
      </div>
    </Link>
  )
}