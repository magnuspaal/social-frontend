'use client'

import { ConfigService } from "../config-service";
import { AbstractClientApiService } from "./abstract-client-api-service";

class ClientAuthService extends AbstractClientApiService {

  constructor() {
    super(ConfigService.getAuthApiUrl(), false)
  }

  getApiHeaders = () => {
    return {
      "Content-Type": "application/json"
    }
  }

  postRegister = async (email: string, password: String, firstName: string, lastName: string, username: string) => 
    this.post(`/register`, JSON.stringify({email, password, firstName, lastName, username}))

  postLogin = async (email: string, password: string) => this.post(`/authenticate`, JSON.stringify({email, password}))
    .then(async (body) => {
      this.setAuthCookies(body.token, body.refreshToken, body.expiresAt)
    })
    
  logout = () => {
    this.removeLocalData()
  }
  
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

const clientAuthService = new ClientAuthService()
export default clientAuthService
