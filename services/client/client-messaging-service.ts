'use client'

import { AbstractApiService } from "../abstract-api-service"
import Cookies from "js-cookie"
import { ConfigService } from "../config-service"
import clientAuthService from "./client-auth-service"
import { ChatMessage } from "@/types/chat-message"

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

  createChat = (body: string) => this.post(`/chat`, body)

  getChatMessages = (offset: number, limit: number, id: number): Promise<ChatMessage[]> =>
    this.get(`/chat/${id}/messages?offset=${offset}&limit=${limit}`, {
      cache: "no-store"
    })

  handleResponseError = async (res: Response): Promise<boolean> => {
    if (res.status == 401) {
      return clientAuthService.handleClientRefreshToken()
    }
    return Promise.resolve(false)
  }
}

const useClientMessagingService = () => {
  const clientMessagingService = new ClientMessagingService()
  return clientMessagingService
} 

export default useClientMessagingService
