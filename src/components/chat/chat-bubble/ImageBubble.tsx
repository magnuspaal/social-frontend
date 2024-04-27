
import { MeContext } from '@/providers/me-provider';
import useFileService from '@/services/file-service';
import { ImageChatMessage } from '@/types/chat/chat-message';
import { decryptImage, decryptText } from '@/utils/encryption-utils';
import { getStringFromReadableStream } from '@/utils/reader-utils';
import { useContext, useEffect, useState } from 'react';

export default function ImageBubble({message}: {message: ImageChatMessage}) {
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
        setSrc(`data:image/jpg;base64,${image}`)
      }
    }
    getFile()
  }, [])

  return (
    <div 
      className={`flex mx-2 my-1 ${isMe ? `place-self-end` : 'place-self-start'}`}>
      <img 
        src={src} 
        className="rounded-xl shadow-light" 
        width={250} />
    </div>
  )
}