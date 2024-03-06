export abstract class AbstractApiService {

  private apiUrl: string

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }

  getApiHeaders = () => ({});

  private handleRequest = async (url: string, options: Record<any, any>) => {
    const request = async (retryRequest: boolean, headers: Record<any, any>) => {
      return fetch(this.apiUrl + url, {headers, ...options})
        .then(async (res: Response) => {
          if (!res.ok) {
            const authenticated = await this.handleResponseError(res)
            if (retryRequest && authenticated) {
              throw new Error("retry_request")
            } 
            throw new Error(res.statusText)
          }
          return res.json()
        })
        .catch(async (error) => {
          await this.handleFetchError(error)
        })
      }

    return request(true, this.getApiHeaders()).catch((error: any) => {
      const {name, message} = error;
      if (message == 'retry_request') {
        return request(false, this.getApiHeaders())
      }
      throw error
    })
  }

  async get(url: string, options?: Record<any, any>) {
    return this.handleRequest(url, {
      method: "GET",
      ...options
    })
  }

  async post(url: string, body?: string | FormData, options?: Record<any, any>) {
    return this.handleRequest(url, {
      method: "POST",
      body,
      ...options
    })
  }

  handleResponseError = async (res: Response): Promise<boolean> => {
    return Promise.resolve(false)
  }

  handleFetchError = async (error: any) => {throw error}
}