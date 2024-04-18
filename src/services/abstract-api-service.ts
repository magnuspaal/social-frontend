import { logInfo, logVerbose } from "@/utils/development-utils";
import cookies from 'js-cookie'

export abstract class AbstractApiService {

  private apiUrl: string
  private handleTokenRefresh: (() => Promise<{authenticated: boolean}>) | undefined

  constructor(
    apiUrl: string, 
    handleTokenRefresh?: () => Promise<{authenticated: boolean}>,
  ) {
    this.apiUrl = apiUrl
    this.handleTokenRefresh = handleTokenRefresh
  }

  getApiHeaders = () => ({});

  makeFetch = async (url: string, headers: Record<any, any>, options: Record<any, any>) => {
    return fetch(this.apiUrl + url, {headers, credentials: 'include', ...options}).then(async (res: Response) => {
      logInfo("Called:", this.apiUrl + url, res.status)
      if (!res.ok) {
        return this.handleResponseError(res);
      } else {
        const json = await res.json()
        logVerbose("Fetch body:", json)
        return json;
      }
    }).catch(async (error) => {
      await this.handleFetchError(error)
    })
  }

  private handleRequest = async (url: string, options: Record<any, any>) => {
    const request = async (headers: Record<any, any>) => {
      const isExpired = await this.isTokenExpired()

      logInfo("Called:", url, "Token expired:", isExpired, "Refresh token:", !!this.handleTokenRefresh)

      if (isExpired && this.handleTokenRefresh) {
        const { authenticated } = await this.handleTokenRefresh()
        if (authenticated) {
          return this.makeFetch(url, headers, options)
        }
      } else {
        return this.makeFetch(url, headers, options)
      }
    }

    return request(this.getApiHeaders())
  }

  async get(url: string, options?: Record<any, any>) {
    return this.handleRequest(url, { method: "GET", ...options })
  }

  async post(url: string, body?: string | FormData, options?: Record<any, any>) {
    return this.handleRequest(url, { method: "POST", body, ...options })
  }

  async patch(url: string, body?: string | FormData, options?: Record<any, any>) {
    return this.handleRequest(url, { method: "PATCH", body, ...options })
  }

  handleResponseError = async (res: Response): Promise<any> => {
    logInfo(res)
    return Promise.resolve(false)
  }

  isTokenExpired = async (): Promise<boolean> => {
    const expiresAt = cookies.get("expiresAt")
    if (expiresAt) {
      const expiresDate = new Date(expiresAt).getTime() / 1000
      const currentDate = new Date(new Date().toUTCString()).getTime() / 1000
      if (expiresDate - 5 > currentDate) {
        return Promise.resolve(false)
      }
    }
    return Promise.resolve(true)
  }
 
  handleFetchError = async (error: any) => {throw error}
}