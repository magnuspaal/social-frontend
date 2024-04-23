

import { Chat } from '@/types/chat';
import { useEffect, useState } from 'react';
import ChatSettingsColor from './ChatSettingsColor';
import useMessagingService from '@/services/messaging-service';
// @ts-ignore
import colorContrast from 'color-contrast'
import ChatSettingsDemo from './ChatSettingsDemo';
import ChatHeaderElement from '../ChatHeaderElement';
import { useAppDispatch } from '@/store/hooks';
import { AlertType, addAlert } from '@/store/alert-slice';
import useTranslation from '@/lang/use-translation';

export default function ChatSettingsPage({chat}: {chat: Chat}) {

  const messagingService = useMessagingService()
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const [myChatBubbleColor, setMyChatBubbleColor] = useState<string>(chat.chatSettings?.myChatBubbleColor ?? "#53DD6C")
  const [myChatTextColor, setMyChatTextColor] = useState<string>(chat.chatSettings?.myChatTextColor ?? "#000000")
  const [myContrast, setMyContrast] = useState<boolean>(true)

  const [theirChatBubbleColor, setTheirChatBubbleColor] = useState<string>(chat.chatSettings?.theirChatBubbleColor ?? "#F3F3F3")
  const [theirChatTextColor, settheirChatTextColor] = useState<string>(chat.chatSettings?.theirChatTextColor ?? "#000000")
  const [theirContrast, setTheirContrast] = useState<boolean>(true)

  const [backgroundColor, setBackgroundColor] = useState<string>(chat.chatSettings?.backgroundColor ?? "#FFFFFF")

  const [elementColor, setElementColor] = useState<string>(chat.chatSettings?.elementColor ?? "#503EC4")
  const [elementTextColor, setElementTextColor] = useState<string>(chat.chatSettings?.elementTextColor ?? "#FFFFFF")
  const [elementContrast, setElementContrast] = useState<boolean>(true)
  const [elementTextContrast, setElementTextContrast] = useState<boolean>(true)

  const [textColor, setTextColor] = useState<string>(chat.chatSettings?.textColor ?? "#000000")
  const [textContrast, setTextContrast] = useState<boolean>(true)

  useEffect(() => {
    setMyContrast(colorContrast(myChatBubbleColor, myChatTextColor) >= 7)
  }, [myChatBubbleColor, myChatTextColor])

  useEffect(() => {
    setTheirContrast(colorContrast(theirChatBubbleColor, theirChatTextColor) >= 7)
  }, [theirChatBubbleColor, theirChatTextColor])

  useEffect(() => {
    setElementContrast(colorContrast(elementColor, backgroundColor) >= 7)
  }, [elementColor, backgroundColor])

  useEffect(() => {
    const contrastWhite = colorContrast(elementColor, "#FFFFFF")
    const contrastBlack = colorContrast(elementColor, "#000000")
    setElementTextContrast(true)
    if (contrastWhite >= 7) {
      setElementTextColor("#FFFFFF")
    } else if (contrastBlack >= 7) {
      setElementTextColor("#000000")
    } else {
      setElementTextContrast(false)
    }
  }, [elementColor])

  useEffect(() => {
    const contrastWhite = colorContrast(backgroundColor, "#FFFFFF")
    const contrastBlack = colorContrast(backgroundColor, "#000000")
    setTextContrast(true)
    if (contrastWhite >= 7) {
      setTextColor("#FFFFFF")
    } else if (contrastBlack >= 7) {
      setTextColor("#000000")
    } else {
      setTextContrast(false)
    }
  }, [backgroundColor])

  const updateChatSettings = async () => {
    const chatSettings = {
      myChatBubbleColor,
      myChatTextColor,
      theirChatBubbleColor,
      theirChatTextColor,
      backgroundColor,
      elementColor,
      textColor,
      elementTextColor
    }
    await messagingService.updateChatSettings(chat.id, JSON.stringify({chatSettings}))
    dispatch(addAlert({message: t('chat.settings.colors.updated'), type: AlertType.SUCCESS}))
  }

  return (
    <div style={{background: backgroundColor}} className="sm:h-[70svh] h-full flex flex-col">
      <ChatHeaderElement color={textColor} iconColor={elementColor} chat={chat} isChatSettings={true} />
      <div className='flex flex-col items-center gap-2 overflow-y-auto h-full relative'>
        <div className='flex w-full px-1 py-3'>
          <ChatSettingsDemo 
            myChatBubbleColor={myChatBubbleColor} 
            myChatTextColor={myChatTextColor} 
            theirChatBubbleColor={theirChatBubbleColor} 
            theirChatTextColor={theirChatTextColor} 
            textColor={textColor}
          />
        </div>
        <div className='flex flex-col bg-white divide-y rounded-md max-w-[400px] w-full px-1'>
          <ChatSettingsColor 
            description={t('chat.settings.colors.your_bubble_color')} 
            color={myChatBubbleColor} 
            setColor={setMyChatBubbleColor} />
          <ChatSettingsColor 
            description={t('chat.settings.colors.your_text_color')} 
            color={myChatTextColor} setColor={setMyChatTextColor} 
            message={`${!myContrast ? t("chat.settings.colors.text_readability") : ''}`} />
          <ChatSettingsColor 
            description={t('chat.settings.colors.their_bubble_color')} 
            color={theirChatBubbleColor} setColor={setTheirChatBubbleColor} />
          <ChatSettingsColor 
            description={t('chat.settings.colors.their_text_color')} 
            color={theirChatTextColor} setColor={settheirChatTextColor} 
            message={`${!theirContrast ? t("chat.settings.colors.text_readability") : ''}`} />
          <ChatSettingsColor 
            description={t('chat.settings.colors.background_color')} 
            color={backgroundColor} setColor={setBackgroundColor} 
            message={`${!textContrast ? t("chat.settings.colors.text_readability") : ''}`} />
          <ChatSettingsColor 
            description={t('chat.settings.colors.element_color')} 
            color={elementColor} setColor={setElementColor} 
            message={`${!elementContrast ? t("chat.settings.colors.element_readability") : ''} ${!elementTextContrast ? t("chat.settings.colors.element_text_readability") : ''}`} />
        </div>
        <button 
          onClick={updateChatSettings} 
          style={{backgroundColor: elementColor, color: elementTextColor}} 
          className='rounded font-bold black p-1 max-w-[150px] w-full bg-primary border border-transparent text-white uppercase mb-20'>
          {t('common.save')}
        </button>
      </div>
    </div>
  )
}