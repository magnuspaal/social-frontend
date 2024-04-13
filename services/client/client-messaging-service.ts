'use client'

import { ConfigService } from "../config-service"
import { ChatMessage } from "@/types/chat/chat-message"
import { UserEncryption } from "@/types/user-encryption"
import { decryptPrivateKey, decryptText } from "@/utils/encryption-utils"
import { AppError, AppErrorType } from "@/error/app-error"
import { Chat } from "@/types/chat"
import { AbstractClientApiService } from "./abstract-client-api-service"

class ClientMessagingService extends AbstractClientApiService {

  constructor() {
    super(ConfigService.getMessagingApiUrl())
  }

  getApiHeaders = () => {
    return {
      "Content-Type": "application/json"
    }
  }

  getUserEncryption = (password: string) => this.post(`/encryption`, JSON.stringify({password}))
    .then((response: UserEncryption) => {
      this.setEncryptionData(response.encryptedPrivateKey, password, response.salt, response.iv)
    })

  createChat = (body: string) => this.post(`/chat`, body)

  updateChatSettings = (id: number, body: string) => this.patch(`/chat/${id}/settings`, body)

  getPrivateChat = (userId: number): Promise<Chat | null> => this.get(`/user/${userId}/chat`)

  getChatMessages = (offset: number, limit: number, id: number): Promise<ChatMessage[]> =>
    this.get(`/chat/${id}/messages?offset=${offset}&limit=${limit}`, {
      cache: "no-store"
    }).then(async (messages: ChatMessage[]) => {
      const key = localStorage.getItem("privateKey")
      if (key) {
        for (const message of messages) {
          try {
            message.content = await decryptText(message.content, key)
          } catch (e: AppError | any) {
            if (e.type == AppErrorType.DECRYPTION_FAILED) {
              localStorage.removeItem('privateKey')
              return []
            } else {
              throw e;
            }
          }
        }
        return messages
      }
      return []
    })

  private setEncryptionData = (encryptedPrivateKey: string, password: string, salt: string, iv: string) => {
    const privateKey = decryptPrivateKey(encryptedPrivateKey, password, salt, iv)
    if (privateKey) {
      localStorage.setItem("privateKey", privateKey);
    }
  }
}

const useClientMessagingService = () => {
  const clientMessagingService = new ClientMessagingService()
  return clientMessagingService
} 

export default useClientMessagingService
