import ChatSettingsPage from "@/components/chat/chat-settings/ChatSettingsPage";
import serverMessagingService from "@/services/server/server-messaging-service";

export default async function ChatSettings({ params }: any) {

  const chatId = params.id;
  const chat = await serverMessagingService.getChat(chatId);

  return <ChatSettingsPage chat={chat} />
}