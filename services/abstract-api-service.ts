import { logInfo, logVerbose } from "@/utils/development-utils";

export abstract class AbstractApiService {

  private apiUrl: string
  private refreshToken: boolean

  constructor(apiUrl: string, refreshToken?: boolean) {
    this.apiUrl = apiUrl
    this.refreshToken = refreshToken ?? true
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

      logInfo("Called:", this.apiUrl + url, "Token expired:", isExpired, "Refresh token:", this.refreshToken)

      if (isExpired && this.refreshToken) {
        const {authenticated, authToken} = await this.handleTokenRefresh()
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
    return Promise.resolve(false)
  }

  handleTokenRefresh = async (): Promise<{authenticated: boolean, authToken?: string}> => {
    return Promise.resolve({authenticated: false})
  }

  isTokenExpired = async (): Promise<boolean> => {
    return Promise.resolve(true)
  }
 
  handleFetchError = async (error: any) => {throw error}
}