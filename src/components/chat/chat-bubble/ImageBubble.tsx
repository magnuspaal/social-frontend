
import ImgSvg from '@/components/svg/ImgSvg';
import { MeContext } from '@/providers/me-provider';
import useFileService from '@/services/file-service';
import { Chat } from '@/types/chat';
import { ImageChatMessage } from '@/types/chat/chat-message';
import { decryptImage, decryptText } from '@/utils/encryption-utils';
import { getStringFromReadableStream } from '@/utils/reader-utils';
import { useContext, useEffect, useState } from 'react';

export default function ImageBubble({message, chat}: {message: ImageChatMessage, chat: Chat}) {
  const fileService = useFileService()

  const { me } = useContext(MeContext)
  const isMe = message.sender.id == me?.id

  const [src, setSrc] = useState<string>("")

  useEffect(() => {
    const getFile = async () => {
      const filename = message.chatImage.filename
      const chatId = message.chatId

      const readableStream = await fileService.getFile(filename, chatId.toString()) as ReadableStream
      
      const imageString = await getStringFromReadableStream(readableStream)

      const key = localStorage.getItem("privateKey")
      if (key) {
        const aesKey = await decryptText(message.chatImage.key, key)
        const image = decryptImage(imageString, aesKey, message.chatImage.iv)
        const fileType = filename.split(".")[1]
        setSrc(`data:image/${fileType};base64,${image}`)
      }
    }
    getFile()
  }, [])

  return (
    <div 
    className={`flex mx-2 my-1 ${isMe ? `place-self-end` : 'place-self-start'}`}>
    {
      src ? 

        <img 
          src={src} 
          className="rounded-xl shadow-light" 
          width={250} />
      :
      <div 
        style={{width: "250px", height: 250 / ((message.chatImage.ratio ?? 100000) / 100000), 
        backgroundColor: isMe ? chat.chatSettings?.myChatBubbleColor : chat.chatSettings?.theirChatBubbleColor}} 
        className='animate-pulse rounded-xl flex justify-center items-center opacity-15'
      >
        <ImgSvg size={30} color={isMe ? chat.chatSettings?.myChatTextColor : chat.chatSettings?.theirChatTextColor}/>
      </div>
    }
    </div>
  )
}