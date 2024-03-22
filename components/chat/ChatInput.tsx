"use client"

import useKeydownListener from '@/hooks/use-keydown-listener';
import useTranslation from '@/lang/use-translation';
import { User } from '@/types/user';
import { Client } from '@stomp/stompjs';
import { useCallback, useRef, useState } from 'react';

export default function ChatInput({me, chatId, client}: {me: User, chatId: number, client: Client}) {

  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { t } = useTranslation()

  const submitPost = useCallback(async () => {
    client.publish({ destination: '/app/message', body: JSON.stringify({
      content: value,
      from: me.id.toString(),
      to: chatId })
    });
    setValue("")
  }, [chatId, client, me.id, value])

  useKeydownListener(submitPost,'Enter')

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.target?.value);
  };

  return (
    <div className={`flex p-3 items-end max-w-4 bg-background`}>
      <textarea 
        onChange={handleChange} 
        placeholder={t('chat.write_message')}
        className="h-[52px] textarea w-full overflow-auto m-h-10 p-3 text-lg resize-none h-14 overflow-hidden bg-background focus:outline-0"
        id="multiliner" 
        name="multiliner"
        ref={textAreaRef}
        value={value}
      ></textarea>
      <button 
        className="rounded bg-primary p-3 font-bold hover:bg-secondary hover:text-black max-h-12 text-white uppercase 
          disabled:hover:bg-primary disabled:hover:text-white disabled:hover:cursor-not-allowed"
        onClick={submitPost}>
          {t('chat.send')}
      </button>
    </div>
  )
}