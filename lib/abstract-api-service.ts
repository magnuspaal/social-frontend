export abstract class AbstractApiService {

  constructor() {}

  getApiHeaders = () => ({}) ;

  private handleRequest = async (url: string, options: Record<any, any>) => {
    const request = async (retryRequest: boolean, headers: Record<any, any>) => {
      return fetch(url, {...options, headers})
        .then(async (res: Response) => {
          if (!res.ok) {
            const authenticated = await this.handleError(res)
            if (retryRequest && authenticated) {
              throw new Error("retry_request")
            } else {
              throw new Error("error")
            }
          }
          return res.json()
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

  async post(url: string, body?: string, options?: Record<any, any>) {
    return this.handleRequest(url, {
      method: "POST",
      body,
      ...options
    })
  }

  handleError = async (res: Response): Promise<boolean> => Promise.resolve(false)
}