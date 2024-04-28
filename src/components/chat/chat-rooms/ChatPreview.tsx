import { Chat } from "@/types/chat"
import ChatMessagePreview from "./ChatMessagePreview"
import { Link } from "react-router-dom"
import ChatUsersList from "../ChatUsersList"
import { colors } from "@/style/colors"

export default function ChatPreview({chat}: {chat: Chat}) {

  return (
    <Link to={`/chat/${chat.id}`} className="flex flex-row items-center flex-wrap justify-center px-4 py-2 w-full">
      <div className="flex flex-col grow w-full">
        <ChatUsersList chat={chat} color={colors.black} iconColor={colors.active} className="flex flex-wrap font-medium gap-2"/>
        <ChatMessagePreview chat={chat}/>
      </div>
    </Link>
  )
}