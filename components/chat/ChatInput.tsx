"use client"

import useKeydownListener from '@/hooks/use-keydown-listener';
import useTranslation from '@/lang/use-translation';
import { MeContext } from '@/providers/me-provider';
import { ChatMessageType } from '@/types/chat-message/chat-message-type';
import { Client } from '@stomp/stompjs';
import { useCallback, useContext, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function ChatInput({chatId, client}: {chatId: number, client: Client}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useTranslation()
  const { me } = useContext(MeContext)

  const [value, setValue] = useState("");
  const [to, setTO] = useState<NodeJS.Timeout>()

  const clientPublish = useCallback((type: ChatMessageType) => {
    client.publish({ destination: '/app/message', body: JSON.stringify({
      type,
      content: type == ChatMessageType.TEXT ? value : undefined,
      from: me?.id.toString(),
      to: chatId })
    });
  }, [chatId, client, me?.id, value])

  const submitPost = useCallback(async () => {
    if (value) {
      clientPublish(ChatMessageType.TEXT)
      setValue("")
    }
  }, [clientPublish, value])

  const submitWriting = useCallback(async () => {
    clientPublish(ChatMessageType.WRITING)
    if (to) clearTimeout(to)
    const timeout = setTimeout(() => {
      clientPublish(ChatMessageType.WRITING_END)
    }, 5000)
    setTO(timeout)
  }, [clientPublish, to])

  useKeydownListener(submitPost,'Enter')

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    submitWriting()
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
            onClick={submitPost}>
              {t('chat.send')}
          </button>
        </CSSTransition>
      }
      </TransitionGroup>
    </div>
  )
}