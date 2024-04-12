"use client"

import useMessagingPublisherMethods from '@/hooks/chat/use-messaging-publisher';
import useKeydownListener from '@/hooks/use-keydown-listener';
import useTranslation from '@/lang/use-translation';
import { MeContext } from '@/providers/me-provider';
import { ChatMessageType } from '@/types/chat/chat-message/chat-message-type';
import { Client } from '@stomp/stompjs';
import { useCallback, useContext, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function ChatInput({chatId, client}: {chatId: number, client: Client}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useTranslation()
  const { me } = useContext(MeContext)

  const [value, setValue] = useState("");

  const {clientPublish, submitWriting } = useMessagingPublisherMethods(client)
  
  const submitDefaultMessage = useCallback(async () => {
    if (value && me) {
      clientPublish(ChatMessageType.TEXT, me.id, chatId, value)
      setValue("")
    }
  }, [chatId, clientPublish, me, value])

  useKeydownListener(submitDefaultMessage,'Enter')

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (me) submitWriting(me.id, chatId)
    setValue(evt.target?.value);
  };

  return (
    <div className={`flex p-3 items-end max-w-4 bg-background`}>
      <textarea 
        onChange={handleChange} 
        placeholder={t('chat.write_message')}
        className="h-[36px] textarea w-full overflow-auto m-h-10 text-base p-2 resize-none h-14 overflow-hidden bg-background focus:outline-0"
        id="multiliner" 
        name="multiliner"
        ref={textAreaRef}
        value={value}
      ></textarea>
      <TransitionGroup component={null}>
      { value && 
        <CSSTransition timeout={200} classNames="slide-from">
          <button 
            className="rounded bg-primary p-2 text-sm font-bold active:bg-secondary active:text-black max-h-12 text-white uppercase 
              disabled:hover:bg-primary disabled:hover:text-white"
            onClick={submitDefaultMessage}>
              {t('chat.send')}
          </button>
        </CSSTransition>
      }
      </TransitionGroup>
    </div>
  )
}