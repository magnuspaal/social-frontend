"use client"

import useMessagingPublisherMethods from '@/hooks/chat/use-messaging-publisher';
import useAutosizeTextArea from '@/hooks/use-auto-size-textarea';
import useKeydownListener from '@/hooks/use-keydown-listener';
import useTranslation from '@/lang/use-translation';
import { MeContext } from '@/providers/me-provider';
import { Chat } from '@/types/chat';
import { ChatMessageType } from '@/types/chat/chat-message/chat-message-type';
import { Client } from '@stomp/stompjs';
import { useCallback, useContext, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function ChatInput({chat, client}: {chat: Chat, client: Client}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useTranslation()
  const { me } = useContext(MeContext)

  const [value, setValue] = useState("");

  const {clientPublish, submitWriting } = useMessagingPublisherMethods(client)
  
  const submitDefaultMessage = useCallback(async () => {
    if (value && me) {
      clientPublish(ChatMessageType.TEXT, me.id, chat.id, value)
      setValue("")
    }
  }, [chat.id, clientPublish, me, value])

  useKeydownListener(submitDefaultMessage,'Enter')
  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (me) submitWriting(me.id, chat.id)
    setValue(evt.target?.value);
  };

  return (
    <div style={{background: chat.chatSettings?.backgroundColor}} className={`flex p-3 items-end max-w-4 bg-background`}>
      <textarea 
        onChange={handleChange} 
        placeholder={t('chat.write_message')}
        className={`h-[40px] textarea w-full overflow-auto m-h-10 text-base resize-none p-2 overflow-hidden bg-background focus:outline-0 ${value ? 'rounded-l-md' : 'rounded-md'}`}
        id="multiliner" 
        name="multiliner"
        ref={textAreaRef}
        value={value}
      ></textarea>
      { value && 
        <button
          style={{backgroundColor: chat.chatSettings?.elementColor, color: chat.chatSettings?.elementTextColor}}
          className="rounded-r-md bg-primary p-2 text-sm font-bold active:bg-secondary active:text-black text-white uppercase 
            disabled:hover:bg-primary disabled:hover:text-white h-full"
          onClick={submitDefaultMessage}>
            {t('chat.send')}
        </button>
      }
    </div>
  )
}