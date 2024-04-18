

import { ChatMessageType } from "@/types/chat/chat-message/chat-message-type";
import { useCallback, useState } from "react";
import { Client } from '@stomp/stompjs';

const useMessagingPublisherMethods = (client: Client | undefined) => {

  const [currentTimeout, setTO] = useState<NodeJS.Timeout>()

  const clientPublish = useCallback((type: ChatMessageType, from: number, to: number, value?: string) => {
    client && client.publish({ destination: '/app/message', body: JSON.stringify({
      type,
      content: value,
      from,
      to })
    });
  }, [client])

  const submitWriting = useCallback(async (from: number, to: number) => {
    clientPublish(ChatMessageType.WRITING, from, to)
    if (currentTimeout) clearTimeout(currentTimeout)
    const timeout = setTimeout(() => {
      clientPublish(ChatMessageType.WRITING_END, from, to)
    }, 5000)
    setTO(timeout)
  }, [clientPublish, currentTimeout])

  const submitSeen = useCallback(async (from: number, to: number, messageId: number) => {
    clientPublish(ChatMessageType.SEEN, from, to, messageId.toString());
  }, [clientPublish])

  return {clientPublish, submitWriting, submitSeen}
} 

export default useMessagingPublisherMethods