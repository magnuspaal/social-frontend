import useMessagingPublisherMethods from '@/hooks/chat/use-messaging-publisher';
import useAutosizeTextArea from '@/hooks/use-auto-size-textarea';
import useImageInput from '@/hooks/use-image-input';
import useKeydownListener from '@/hooks/use-keydown-listener';
import useTranslation from '@/lang/use-translation';
import { MeContext } from '@/providers/me-provider';
import { Chat } from '@/types/chat';
import { ChatMessageType } from '@/types/chat/chat-message/chat-message-type';
import { useCallback, useContext, useRef, useState } from 'react';
import SendSvg from '../svg/SendSvg';
import useMessagingService from '@/services/messaging-service';
import Loading from '../common/Loading';
import { MessagingClientContext } from '@/providers/messaging-client-provider';

export default function ChatInput({chat}: {chat: Chat}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useTranslation()
  const { me } = useContext(MeContext)

  const messagingService = useMessagingService()
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const { client } = useContext(MessagingClientContext)
      
  const { clientPublish, submitWriting } = useMessagingPublisherMethods(client)
  const { selectedFile, renderImage, renderImageButton, renderImageInput, removeImage } = useImageInput()

  const submitMessage = useCallback(async () => {
    setLoading(true)
    if (selectedFile && me) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      await messagingService.uploadImage(formData, chat.id)
        .finally(() => {
          removeImage()
          setLoading(false)
        })
    } else if (value && me) {
      clientPublish(ChatMessageType.TEXT, me.id, chat.id, value)  
    }
    setValue("")
    setLoading(false)
  }, [chat.id, clientPublish, me, messagingService, removeImage, selectedFile, value])

  useKeydownListener(submitMessage,'Enter')
  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (me) submitWriting(me.id, chat.id)
    setValue(evt.target?.value);
  };

  const displaySendButton = () => value || selectedFile

  return (
    <div style={{background: chat.chatSettings?.backgroundColor}} className={`flex my-4 mr-4 ml-4 items-end max-w-4 bg-background rounded`}>
      <div className='flex w-full relative'>
        {renderImageButton('mb-2 mr-3 flex items-end', chat.chatSettings?.elementColor, loading)}
        <div className='flex flex-col w-full relative'>
          {renderImage("mb-2 mt-2", 250)}
          {
            !selectedFile &&
            <textarea 
              onChange={handleChange} 
              placeholder={t('chat.write_message')}
              className={`h-[40px] textarea w-full overflow-auto m-h-10 text-base resize-none p-2 overflow-hidden bg-background focus:outline-0 rounded-md pr-[45px] shadow-dark`}
              id="multiliner" 
              name="multiliner"
              ref={textAreaRef}
              value={value}
            />
          }
        </div>
        { displaySendButton() &&
          <button
            style={{backgroundColor: chat.chatSettings?.elementColor, color: chat.chatSettings?.elementTextColor}}
            className="rounded bg-primary p-2 text-sm font-bold active:bg-secondary active:text-black text-white uppercase 
              disabled:hover:bg-primary disabled:hover:text-white absolute right-0 bottom-0"
            onClick={submitMessage}
            disabled={loading}  
          >
            { 
              loading
              ? <Loading className='' color={chat.chatSettings?.elementTextColor} size={24} borderWidth={3} noTimeout={true}/>
              : <SendSvg color={chat.chatSettings?.elementTextColor}/>
            }
          </button>
        }
      </div>
      {renderImageInput()}
    </div>
  )
}