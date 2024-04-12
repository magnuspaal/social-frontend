import { ConfigService } from "../config-service"
import { Chat } from "@/types/chat"
import { AbstractServerApiService } from "./abstract-server-api-service"

class ServerMessagingService extends AbstractServerApiService {
  constructor() {
    super(ConfigService.getMessagingApiUrl())
  }

  getChat = (id: number) => this.get(`/chat/${id}`, { cache: "no-cache" })

  getUserChats = (): Promise<Chat[]> => this.get(`/user/chats`, { cache: "no-cache", next: { tags: ["chats"] } })
}

const serverMessagingService = new ServerMessagingService()
export default serverMessagingService
