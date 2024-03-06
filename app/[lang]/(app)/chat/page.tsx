import { getDictionary } from "@/lang/lang";
import apiService from "@/services/api-service";
import ChatRooms from "@/components/chat/ChatRooms";

export default async function ChatPage({ params }: any) {

  const dict = await getDictionary(params.lang)
  const me = await apiService.getMe()

  return (
    <div>
      <ChatRooms me={me} dict={dict}/>
    </div>
  )
}