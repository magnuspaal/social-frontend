
import apiService from "@/services/server/server-api-service";
import ChatWindow from "@/components/chat/ChatWindow";

export default async function ChatPage({ params }: any) {

  const me = await apiService.getMe()

  return (
    <ChatWindow me={me} chatId={params.id}/>
  )
}