import { ConfigService } from "../config-service"
import { Chat } from "@/types/chat"
import { AbstractServerApiService } from "./abstract-server-api-service"

class ServerMessagingService extends AbstractServerApiService {
  constructor() {
    super(ConfigService.getMessagingApiUrl())
  }

  getChat = (id: number) => this.get(`/chat/${id}`, { cache: "no-store"})

  getUserChats = (): Promise<Chat[]> => this.get(`/user/chats`, { cache: "no-store" })
}

const serverMessagingService = new ServerMessagingService()
export default serverMessagingService
