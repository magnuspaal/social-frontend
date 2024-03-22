'use client'

import { AbstractApiService } from "../abstract-api-service"
import Cookies from "js-cookie"
import { ConfigService } from "../config-service"
import clientAuthService from "./client-auth-service"
import { ChatMessage } from "@/types/chat-message"
import { UserEncryption } from "@/types/user-encryption"
import { decryptPrivateKey, decryptText } from "@/utils/encryption-utils"
import { AppError, AppErrorType } from "@/error/app-error"

class ClientMessagingService extends AbstractApiService {

  constructor() {
    super(ConfigService.getMessagingApiUrl())
  }

  getApiHeaders = () => {
    const authToken = Cookies.get("authToken")
    return {
      "Authorization": "Bearer " + authToken,
      "Content-Type": "application/json"
    }
  }

  getUserEncryption = (password: string) => this.post(`/encryption`, JSON.stringify({password}))
    .then((response: UserEncryption) => {
      this.setEncryptionData(response.encryptedPrivateKey, password, response.salt, response.iv)
    })

  createChat = (body: string) => this.post(`/chat`, body)

  getChatMessages = (offset: number, limit: number, id: number): Promise<ChatMessage[]> =>
    this.get(`/chat/${id}/messages?offset=${offset}&limit=${limit}`, {
      cache: "no-store"
    }).then(async (messages: ChatMessage[]) => {
      const key = localStorage.getItem("privateKey")
      if (key) {
        for (const message of messages) {
          console.log(message)
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

  handleResponseError = async (res: Response): Promise<boolean> => {
    if (res.status == 401) {
      return clientAuthService.handleClientRefreshToken()
    }
    return Promise.resolve(false)
  }

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
