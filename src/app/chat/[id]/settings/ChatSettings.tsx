

import Loading from "@/components/common/Loading";
import ChatSettingsPage from "@/components/chat/chat-settings/ChatSettingsPage";
import useMessagingService from "@/services/messaging-service";
import { Chat } from "@/types/chat";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProtectedRoute } from "@/ProtectedRoute";

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
    <ProtectedRoute>
      { chat ? <ChatSettingsPage chat={chat} /> : <Loading />}
    </ProtectedRoute>
  )
}