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

  getUserChats = (userId: number): Promise<Chat[]> => this.get(`/user/${userId}/chats`, {
    cache: "no-store"
  })

  handleResponseError = async (res: Response): Promise<boolean> => {
    console.log(res.status)
    if ([401, 403].includes(res.status)) {
      redirect(`/login`)
    }
    return Promise.resolve(false)
  }
}

const serverMessagingService = new ServerMessagingService()
export default serverMessagingService
