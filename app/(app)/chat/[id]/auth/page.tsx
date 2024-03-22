import PasswordAuth from "@/components/chat/PasswordAuth";

export default async function ChatAuth({ params }: any) {
  return <PasswordAuth chatId={params.id}/>
}