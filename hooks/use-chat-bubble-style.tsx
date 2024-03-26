import { ChatMessage } from "@/types/chat-message";
import { compareMessageTimeStamps } from "@/utils/date-utils";
import { RefObject, useCallback, useEffect, useState } from "react";

// Updates the height of a <textarea> when the value changes.
const useChatBubbleStyle = (
  prevMessage: ChatMessage,
  message: ChatMessage,
  span: RefObject<HTMLDivElement>,
  container: RefObject<HTMLDivElement>
) => {

  const range = document.createRange()

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
    } else {
      setDisplayTimestamp(true)
      setDisplayUsername(true)
    }
    findWidth()
  }, [])

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
