'use client'

import cookies from "js-cookie";
import { AbstractApiService } from "../abstract-api-service";
import { ConfigService } from "../config-service";

class ClientAuthService extends AbstractApiService {

  constructor() {
    super(ConfigService.getAuthApiUrl())
  }

  getApiHeaders = () => {
    return {
      "Content-Type": "application/json"
    }
  }

  postRegister = async (email: string, password: String, firstName: string, lastName: string, username: string) => {
    return this.post(`/register`, JSON.stringify({email, password, firstName, lastName, username}))
  }

  postLogin = async (email: string, password: string) => {
    return this.post(`/authenticate`, JSON.stringify({email, password})
    ).then(async (body) => {
      this.setAuthCookies(body.token, body.refreshToken, body.expiresAt)
    })
  }

  logout = async () => {
    this.removeLocalData()
  }
  
  postRefreshToken = async (refreshToken: String) => {
    return this.post(`/refresh`, JSON.stringify({refreshToken})) 
  };

  handleClientRefreshToken = async () => {
    const cookiesRefreshToken = cookies.get("refreshToken")
    if (cookiesRefreshToken) {
      return this.postRefreshToken(cookiesRefreshToken).then((body) => {
        this.setAuthCookies(body.token, body.refreshToken, body.expiresAt)
        return true
      }).catch(() => {
        this.removeLocalData()
        return false
      })
    } else {
      this.removeLocalData()
      return false
    }
  }  
  
  setAuthCookies = (token: string, refreshToken: string, expiresAt: string, ) => {
    const secure = process.env.NODE_ENV == 'production'
    const domain = ConfigService.getWebsocketDomain()
    cookies.set("authToken", token, { expires: 60 * 10 / 86400, secure, domain})
    cookies.set("refreshToken", refreshToken, { expires: 60 * 60 * 24 * 30 * 6 / 86400, secure, sameSite: "strict" })
    cookies.set("expiresAt", expiresAt, { expires: 60 * 10 / 86400, secure, sameSite: "strict"})
  }

  removeLocalData = () => {
    cookies.remove("authToken")
    cookies.remove("refreshToken")
    cookies.remove("expiresAt")
    localStorage.removeItem("privateKey")
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
}

const clientAuthService = new ClientAuthService()
export default clientAuthService
