import { AbstractApiService } from "./abstract-api-service";

class AuthService extends AbstractApiService {

  constructor() {
    super(import.meta.env.VITE_AUTH_API_URL)
  }

  getApiHeaders = () => ({ "Content-Type": "application/json" })

  postRegister = async (email: string, password: string, firstName: string, lastName: string, username: string) => 
    this.post(`/register`, JSON.stringify({email, password, firstName, lastName, username}))

  postLogin = async (email: string, password: string) => this.post(`/authenticate`, JSON.stringify({email, password}))
  
  handleResponseError = async (res: Response) => {
    if ([401, 403].includes(res.status)) {
      return Promise.reject(["wrong_credentials"])
    } else if (![200, 201].includes(res.status)) {
      const body = await res.json().catch(() => console.error("No body on request"))
      if (body?.codes) {
        return Promise.reject(body.codes)
      }
    }
    return Promise.resolve(false)
  }

  isTokenExpired = (): Promise<boolean> => {
    return Promise.resolve(false)
  }
}

export default function useAuthService() {
  return new AuthService()
} 
