export class ConfigService {

  private static apiUrl: string
  private static authApiUrl: string
  private static fileApiUrl: string
  private static messagingApiUrl: string
  private static websocketUrl: string
  private static websocketDomain: string

  static {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) throw new Error("API_URL not defined")

    const authApiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL
    if (!authApiUrl) throw new Error ("AUTH_API_URL not defined")

    const fileApiUrl = process.env.NEXT_PUBLIC_FILE_API_URL
    if (!fileApiUrl) throw new Error("FILE_API_URL not defined")

    const messagingApiUrl = process.env.NEXT_PUBLIC_MESSAGING_API_URL
    if (!messagingApiUrl) throw new Error("MESSAGING_API_URL not defined")

    const websocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL
    if (!websocketUrl) throw new Error("WEBSOCKET_URL not defined")

    const websocketDomain = process.env.NEXT_PUBLIC_WEBSOCKET_DOMAIN
    if (!websocketDomain) throw new Error("WEBSOCKET_DOMAIN not defined")

    this.apiUrl = apiUrl
    this.authApiUrl = authApiUrl
    this.fileApiUrl = fileApiUrl
    this.messagingApiUrl = messagingApiUrl
    this.websocketUrl = websocketUrl
    this.websocketDomain = websocketDomain
  }

  static getApiUrl = () => {
    return this.apiUrl
  }

  static getAuthApiUrl = () => {
    return this.authApiUrl
  }

  static getFileApiUrl = () => {
    return this.fileApiUrl
  }

  static getMessagingApiUrl = () => {
    return this.messagingApiUrl
  }

  static getWebsocketUrl = () => {
    return this.websocketUrl
  }

  static getWebsocketDomain = () => {
    return this.websocketDomain
  }
}