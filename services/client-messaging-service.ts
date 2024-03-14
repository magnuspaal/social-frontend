'use client'

import { AbstractApiService } from "./abstract-api-service"
import Cookies from "js-cookie"
import { ConfigService } from "./config-service"
import authService from "./auth-service"
import { ChatMessage } from "@/types/chat-message"

class ClientMessagingApiService extends AbstractApiService {

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

  createChat = (body: string) => this.post(`/chat`, body, )

  getChatMessages = (offset: number, limit: number, id: number): Promise<ChatMessage[]> =>
    this.get(`/chat/${id}/messages?offset=${offset}&limit=${limit}`, {
      cache: "no-store"
    })

  handleResponseError = async (res: Response): Promise<boolean> => {
    if (res.status == 401) {
      return authService.handleClientRefreshToken()
    }
    return Promise.resolve(false)
  }
}

const useClientMessagingApiService = () => {
  const clientMessagingApiService = new ClientMessagingApiService()
  return clientMessagingApiService
} 

export default useClientMessagingApiService
