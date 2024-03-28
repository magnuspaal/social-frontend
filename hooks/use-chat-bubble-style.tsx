import { ChatMessage } from "@/types/chat-message";
import { compareMessageTimeStamps } from "@/utils/date-utils";
import { RefObject, useCallback, useEffect, useState } from "react";
import { useAppSelector } from '@/store/hooks';

// Updates the height of a <textarea> when the value changes.
const useChatBubbleStyle = (
  message: ChatMessage,
  span: RefObject<HTMLDivElement>,
  container: RefObject<HTMLDivElement>
) => {

  const range = document.createRange()

  const prevMessage: ChatMessage = useAppSelector((state: any) => {
    return state.messaging.messages[message.chatId].find((foundMessage: ChatMessage) => {
      return foundMessage.chatMessageId + 1 == message.chatMessageId
    })
  });

  const [displayTimestamp, setDisplayTimestamp] = useState<boolean>(false)
  const [displayGap, setDisplayGap] = useState<boolean>(false);
  const [displayUsername, setDisplayUsername] = useState<boolean>(false);

  const findWidth = useCallback(() => {
    const text = span.current?.childNodes[0];

    if (text && container.current && container.current?.offsetWidth - span.current?.offsetWidth <= 16 ) {
      range.setStartBefore(text);
      range.setEndAfter(text);
  
      const clientRect = range.getBoundingClientRect();
      span.current.style.width = `${clientRect.width}px`;
    }
  }, [range])

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
    findWidth()
  }, [findWidth, message.chatMessageId, message.createdAt, message.sender.id, prevMessage])

  useEffect(() => {
    if (container.current) {
      const observer = new ResizeObserver(entries => {
        findWidth()
      })
      observer.observe(container.current)
    }
  }, [container, findWidth, range])

  return [displayTimestamp, displayGap, displayUsername]
};

export default useChatBubbleStyle;
