import { AbstractApiService } from "./abstract-api-service";

class FileService extends AbstractApiService {

  constructor() {
    const fileApiUrl = import.meta.env.VITE_FILE_API_URL
    const fileApiV = import.meta.env.VITE_FILE_API_V
    super(`${fileApiUrl}${fileApiV}`)
  }

  getApiHeaders = () => ({ "Content-Type": "application/json" })

  getFile = async (filename: string, chatId: string) => this.get(`/chat/file?filename=${filename}&chatId=${chatId}`)
}

export default function useFileService() {
  return new FileService()
}