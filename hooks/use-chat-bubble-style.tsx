import { ChatMessage } from "@/types/chat-message";
import { compareMessageTimeStamps } from "@/utils/date-utils";
import { useEffect, useState } from "react";
import { useAppSelector } from '@/store/hooks';

// Updates the height of a <textarea> when the value changes.
const useChatBubbleStyle = (
  message: ChatMessage
) => {

  const prevMessage: ChatMessage = useAppSelector((state: any) => {
    return state.messaging.messages.find((foundMessage: ChatMessage) => {
      return foundMessage.chatMessageId + 1 == message.chatMessageId && foundMessage.chatId == message.chatId
    })
  });

  const [displayTimestamp, setDisplayTimestamp] = useState<boolean>(false)
  const [displayGap, setDisplayGap] = useState<boolean>(false);
  const [displayUsername, setDisplayUsername] = useState<boolean>(false);

  useEffect(() => {
    if (prevMessage) {
      const diffInSconds = compareMessageTimeStamps(prevMessage.createdAt, message.createdAt)
      if (prevMessage.sender.id !== message.sender.id) {
        setDisplayGap(true)
        setDisplayUsername(true)
      } else {
        setDisplayGap(diffInSconds > 30)
      }
      setDisplayTimestamp(diffInSconds > 60 * 5)
    } else if (message.chatMessageId == 1) {
      setDisplayTimestamp(true)
      setDisplayUsername(true)
    }
  }, [message.chatMessageId, message.createdAt, message.sender.id, prevMessage])

  return [displayTimestamp, displayGap, displayUsername]
};

export default useChatBubbleStyle;
