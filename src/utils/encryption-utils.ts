import { AppError, AppErrorType } from '@/error/app-error';
import { ChatMessage, TextChatMessage } from '@/types/chat/chat-message';
import { ChatMessageType } from '@/types/chat/chat-message/chat-message-type';
import { Buffer } from 'buffer';
import CryptoJS from 'crypto-js';

export const decryptPrivateKey = (encryptedPrivateKey: string, password: string, salt: string, iv: string) => {
  const key = CryptoJS.PBKDF2(password, CryptoJS.enc.Base64.parse(salt), {keySize: 8, iterations: 1000, hasher: CryptoJS.algo.SHA256})

  let privateKey;
  try {
    privateKey = CryptoJS.AES.decrypt(
      encryptedPrivateKey, 
      key,
      { iv: CryptoJS.enc.Base64.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7 })
    return privateKey.toString(CryptoJS.enc.Base64)
  } catch (error) {
    console.error(error)
  }
}

export const encryptText = async (text: string, key: string) => {
  const encryptKey = await crypto.subtle.importKey("spki", Buffer.from(key, 'base64'), {name: "RSA-OAEP", hash: "SHA-256"}, true, ['encrypt'])
  const encryptedText = await crypto.subtle.encrypt({name: "RSA-OAEP"}, encryptKey, new TextEncoder().encode(text))
  return new TextDecoder().decode(encryptedText);
}

export const decryptText = async (encryptedText: string, key: string) => {
  if (import.meta.env.VITE_LOCAL_NETWORK) {
    return encryptedText
  }
  try {
    const decryptKey = await crypto.subtle.importKey("pkcs8", Buffer.from(key, 'base64'), {name: "RSA-OAEP", hash: "SHA-256"}, true, ['decrypt'])
    const bufferSource = Buffer.from(encryptedText, 'base64');
    const text = await crypto.subtle.decrypt({name: "RSA-OAEP"}, decryptKey, bufferSource)
    return new TextDecoder().decode(text)
  } catch (e: Error | any) {
    if (e.toString() == "DataError") {
      throw new AppError(AppErrorType.DECRYPTION_FAILED, e)
    }
    throw e;
  }
}

export const decryptMessage = async (message: TextChatMessage, key: string) => {
  try {
    if (message.type == ChatMessageType.TEXT) {
      const decryptedMessage = await decryptText(message.content, key)
      message.content = decryptedMessage ?? "Message could not be decrypted"
    } else if (message.type == ChatMessageType.IMAGE) {
      message.content = "**image**"
    }
    return message
  } catch (e: AppError | any) {
    if (e.type == AppErrorType.DECRYPTION_FAILED) {
      localStorage.removeItem('privateKey')
      return []
    } else {
      throw e;
    }
  }
}

export const decryptMessages = async (messages: ChatMessage[]) => {
  const key = localStorage.getItem("privateKey")
  if (key) {
    for (const message of messages) {
      await decryptMessage(message, key)
    }
    return messages
  }
  return []
}

export const decryptImage = (imageBytes: string, key: string, iv: string) => {
  let image;
  try {
    image = CryptoJS.AES.decrypt(
      imageBytes, 
      CryptoJS.enc.Base64.parse(key),
      { iv: CryptoJS.enc.Base64.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7 })
    return image.toString(CryptoJS.enc.Base64)
  } catch (error) {
    console.error(error)
  }
}