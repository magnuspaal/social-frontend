import { AbstractApiService } from "../abstract-api-service"
import { ConfigService } from "../config-service"
import { Chat } from "@/types/chat"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

class ServerMessagingService extends AbstractApiService {

  constructor() {
    super(ConfigService.getMessagingApiUrl())
  }

  getApiHeaders = () => {
    const authToken = cookies().get("authToken")
    return {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + authToken?.value,
    }
  }

  getUserChats = (): Promise<Chat[]> => this.get(`/user/chats`, {
    cache: "no-store"
  })

  handleResponseError = async (res: Response): Promise<boolean> => {
    return Promise.resolve(false)
  }

  handleTokenRefresh = (): Promise<boolean> => {
    redirect(`/login`)
  };
}

const serverMessagingService = new ServerMessagingService()
export default serverMessagingService
