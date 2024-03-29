"use client"

import useKeydownListener from '@/hooks/use-keydown-listener';
import useTranslation from '@/lang/use-translation';
import { MeContext } from '@/providers/me-provider';
import { Client } from '@stomp/stompjs';
import { useCallback, useContext, useRef, useState } from 'react';

export default function ChatInput({chatId, client}: {chatId: number, client: Client}) {

  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { t } = useTranslation()

  const { me } = useContext(MeContext)

  const submitPost = useCallback(async () => {
    client.publish({ destination: '/app/message', body: JSON.stringify({
      content: value,
      from: me?.id.toString(),
      to: chatId })
    });
    setValue("")
  }, [chatId, client, me?.id, value])

  useKeydownListener(submitPost,'Enter')

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <button 
        className="rounded bg-primary p-2 text-sm font-bold hover:bg-secondary hover:text-black max-h-12 text-white uppercase 
          disabled:hover:bg-primary disabled:hover:text-white disabled:hover:cursor-not-allowed"
        onClick={submitPost}>
          {t('chat.send')}
      </button>
    </div>
  )
}