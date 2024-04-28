import ChatSettingsPage from "@/components/chat/chat-settings/ChatSettingsPage";
import Loading from "@/components/common/Loading";
import useMessagingService from "@/services/messaging-service";
import { Chat } from "@/types/chat";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ChatSettings() {

  const params = useParams()

  const messagingService = useMessagingService()

  const [chat, setChat] = useState<Chat>()
  
  useEffect(() => {
    const getChat = async () => {
      if (params.id) {
        setChat(await messagingService.getChat(parseInt(params.id)))
      }
    }
    getChat()
  }, [])

  return (
    <>
      { chat ? <ChatSettingsPage chat={chat} /> :        
        <div className='flex justify-center items-center h-full w-full'>
          <Loading size={75} borderWidth={8}/>
        </div>
      }
    </>
  )
}