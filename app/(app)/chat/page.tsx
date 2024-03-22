import apiService from "@/services/server/server-api-service";
import ChatRooms from "@/components/chat/ChatRooms";

export default async function ChatPage({ params }: any) {

  const me = await apiService.getMe()

  return (
    <ChatRooms me={me}/>
  )
}