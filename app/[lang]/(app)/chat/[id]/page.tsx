import { getDictionary } from "@/lang/lang";
import apiService from "@/services/api-service";
import ChatWindow from "@/components/chat/ChatWindow";

export default async function ChatPage({ params }: any) {

  const dict = await getDictionary(params.lang)
  const me = await apiService.getMe()

  return (
    <ChatWindow me={me} dict={dict} chatId={params.id}/>
  )
}