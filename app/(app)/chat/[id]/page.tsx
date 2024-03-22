import ChatWindow from "@/components/chat/ChatWindow";

export default async function ChatPage({ params }: any) {
  return <ChatWindow chatId={params.id}/>
}