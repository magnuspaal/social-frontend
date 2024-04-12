import ChatWindow from "@/components/chat/ChatWindow";
import serverMessagingService from "@/services/server/server-messaging-service";

export default async function ChatPage({ params }: any) {

  const chatId = params.id;
  const chat = await serverMessagingService.getChat(chatId);

  return <ChatWindow chat={chat}/>
}