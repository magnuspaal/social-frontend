import useMessagingPublisherMethods from '@/hooks/chat/use-messaging-publisher';
import { MeContext } from '@/providers/me-provider';
import { MessagingClientContext } from '@/providers/messaging-client-provider';
import { ChatMessage } from '@/types/chat/chat-message';
import { MessageReaction } from '@/types/chat/chat-message/message-reaction';
import { MouseEventHandler, TouchEventHandler, useContext } from 'react';
import { CSSTransition, SwitchTransition} from 'react-transition-group';

interface ChatBubbleReactionsProps  {
  message: ChatMessage, 
  reactionSelectorShown: boolean,
  setReactionSelectorShown: React.Dispatch<React.SetStateAction<boolean>>, 
}

export default function ChatBubbleReactions({message, reactionSelectorShown, setReactionSelectorShown}: ChatBubbleReactionsProps) {

  const { client } = useContext(MessagingClientContext)
  const { me } = useContext(MeContext) 
  const { submitReaction } = useMessagingPublisherMethods(client)

  const hideReactionSelectorClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setReactionSelectorShown(false)
  }

  const hideReactionSelectorTouch: TouchEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation()
    setReactionSelectorShown(false)
  }

  const postReaction = () => {
    if (me) submitReaction(me.id, message.chatId, "0x2764", message.chatMessageId)
    setReactionSelectorShown(false)
  }

  return (
    <div>
      {
        reactionSelectorShown && 
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-600 opacity-80 z-10" onClick={hideReactionSelectorClick} onTouchStart={hideReactionSelectorTouch}/>
      }
      <SwitchTransition mode={'out-in'}>
        <CSSTransition key={reactionSelectorShown ? 'selector' + message.id : 'display' + message.id} timeout={200} classNames="reaction">
          {
            reactionSelectorShown ? 
            <><div className='flex gap-1 bg-white p-1 absolute bottom-[-15px] right-1 rounded-full shadow z-20'>
              <button onClick={postReaction} className='text-[20px] px-1 hover:scale-110'>
                {String.fromCodePoint(0x2764)}
              </button>
            </div></>
            : 
            <>{ message.messageReactions.length != 0 &&
              <div className='flex gap-1 bg-white p-1 absolute bottom-[-15px] right-1 rounded-full shadow'>
                {
                  message.messageReactions.map((messageReaction: MessageReaction) =>
                    <span className='text-[10px]' role="img" aria-label="emoji" key={messageReaction.id}>
                      {String.fromCodePoint(Number(messageReaction.reaction))}
                    </span>
                  )
                }
              </div>
            }</>
          }
        </CSSTransition>
      </SwitchTransition>
    </div>
   
  )
}