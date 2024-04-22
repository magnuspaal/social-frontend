

import { ChatMessage } from "@/types/chat/chat-message"
import { UserEncryption } from "@/types/user-encryption"
import { decryptPrivateKey, decryptText } from "@/utils/encryption-utils"
import { AppError, AppErrorType } from "@/error/app-error"
import { Chat } from "@/types/chat"
import { AbstractApiService } from "./abstract-api-service"
import { AuthContext } from "@/providers/auth-provider"
import { useContext } from "react"

class MessagingService extends AbstractApiService {

  constructor(
    handleTokenRefresh: () => Promise<boolean>
  ) {
    super(import.meta.env.VITE_MESSAGING_API_URL, handleTokenRefresh)
  }

  getApiHeaders = () => {
    return {
      "Content-Type": "application/json"
    }
  }

  getChat = (id: number) => this.get(`/chat/${id}`)

  getUserChats = (): Promise<Chat[]> => this.get(`/user/chats`)

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

  handleResponseError = async (res: Response): Promise<boolean | null> => {
    if (res.status == 404) {
      return Promise.resolve(null)
    } else if (![200, 201].includes(res.status)) {
      const body = await res.json().catch(() => console.error("No body on request"))
      if (body?.codes) {
        return Promise.reject(body.codes)
      }
    }
    return Promise.resolve(false)
  }
}

const useMessagingService = () => {
  const { handleTokenRefresh } = useContext(AuthContext);
  const messagingService = new MessagingService(handleTokenRefresh)
  return messagingService
} 

export default useMessagingService
