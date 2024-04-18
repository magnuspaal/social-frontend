

import { useAppSelector } from '@/store/hooks';
import { Chat } from '@/types/chat';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';
import ChatWritingBubble from './ChatWritingBubble';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';

export default function ChatWriting({chat}: {chat: Chat}) {

  const writing = useAppSelector((state) => state.messaging.writingMessage)

  const [senders, setSenders] = useState<User[]>([])
 
  useEffect(() => {
    if (Object.keys(writing).includes(chat.id.toString())) {
      const array = writing[chat.id]
      if (array) {
        setSenders(array)
      }
    }
  }, [writing])

  return (
    <TransitionGroup component={null}>
    {
      senders.map((sender: User) => {
        return (
          <CSSTransition
            in={true}
            appear={true}
            key={sender.id}
            timeout={2000}
            classNames="message">
            <ChatWritingBubble key={chat.id + "-" + sender.id} sender={sender} chat={chat}/>
          </CSSTransition>
        )
      })
    }
    </TransitionGroup>
  )
}