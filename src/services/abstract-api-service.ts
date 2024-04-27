import { logInfo, logVerbose } from "@/utils/development-utils";
import cookies from 'js-cookie'

export abstract class AbstractApiService {

  private apiUrl: string
  private handleTokenRefresh: (() => Promise<boolean>) | undefined

  constructor(
    apiUrl: string, 
    handleTokenRefresh?: () => Promise<boolean>,
  ) {
    this.apiUrl = apiUrl
    this.handleTokenRefresh = handleTokenRefresh
  }

  getApiHeaders = () => {return {}}

  makeFetch = async (url: string, headers?: Record<any, any>, options?: Record<any, any>) => {
    return fetch(this.apiUrl + url, {headers, credentials: 'include', ...options}).then(async (res: Response) => {
      logInfo("Called:", this.apiUrl + url, res.status)
      const contentType = res.headers.get("Content-Type");
      if (!res.ok) {
        return this.handleResponseError(res);
      } else if (contentType && contentType == "application/json") {
        const json = await res.json()
        logVerbose("Fetch body:", json)
        return json;
      } else if (contentType && contentType == "application/octet-stream") {
        return res.body
      }
    }).catch(async (error) => {
      await this.handleFetchError(error)
    })
  }

  private handleRequest = async (url: string, options: Record<any, any>, headers?: Record<any, any>) => {
    const request = async (headers?: Record<any, any>) => {
      const isExpired = await this.isTokenExpired()

      logInfo("Called:", url, "Token expired:", isExpired, "Refresh token:", !!this.handleTokenRefresh)

      if (isExpired && this.handleTokenRefresh) {
        const authenticated = await this.handleTokenRefresh()
        if (authenticated) {
          return this.makeFetch(url, headers, options)
        }
      } else {
        return this.makeFetch(url, headers, options)
      }
    }

    return request(headers)
  }

  async get(url: string, options?: Record<any, any>) {
    return this.handleRequest(url, { method: "GET", ...options })
  }

  async post(url: string, body?: string | FormData, headers?: Record<any, any>, options?: Record<any, any>) {
    return this.handleRequest(url, { method: "POST", body, ...options }, headers ?? this.getApiHeaders())
  }

  async patch(url: string, body?: string | FormData, options?: Record<any, any>) {
    return this.handleRequest(url, { method: "PATCH", body, ...options }, this.getApiHeaders())
  }

  handleResponseError = async (res: Response): Promise<any> => {
    logInfo(res)
    return Promise.resolve(false)
  }

  isTokenExpired = async (): Promise<boolean> => {
    const expiresAt = cookies.get("expiresAt")
    const authToken = cookies.get("authToken")
    if (expiresAt && authToken) {
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