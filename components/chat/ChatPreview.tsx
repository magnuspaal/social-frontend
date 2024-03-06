import Link from "next/link"
import { Chat } from "@/types/chat"

export default function ChatPreview({dict, chat}: {dict: any, chat: Chat}) {

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