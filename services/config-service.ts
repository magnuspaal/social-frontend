export class ConfigService {

  private static apiUrl: string
  private static authApiUrl: string
  private static fileApiUrl: string

  static {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) throw new Error("API_URL not defined")
    const authApiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL
    if (!authApiUrl) throw new Error ("AUTH_API_URL not defined")
    const fileApiUrl = process.env.NEXT_PUBLIC_FILE_API_URL
    if (!fileApiUrl) throw new Error("FILE_API_URL not defined")

    this.apiUrl = apiUrl
    this.authApiUrl = authApiUrl
    this.fileApiUrl = fileApiUrl
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
}