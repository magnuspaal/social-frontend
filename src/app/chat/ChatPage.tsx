

import { ProtectedRoute } from "@/ProtectedRoute";
import ChatRooms from "@/components/chat/chat-rooms/ChatRooms";

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <ChatRooms />
    </ProtectedRoute>
  )
}