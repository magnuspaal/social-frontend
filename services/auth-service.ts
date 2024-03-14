'use client'

import cookies, { CookieAttributes } from "js-cookie";
import { NextRequest } from "next/server";
import { AbstractApiService } from "./abstract-api-service";
import { ConfigService } from "./config-service";

class AuthService extends AbstractApiService {

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

  postLogin = async (email: String, password: String) => {
    return this.post(`/authenticate`, JSON.stringify({email, password})
    ).then(async (body) => {
      this.setCookies(body.token, body.refreshToken, body.expiresAt)
    })
  }

  logout = async () => {
    this.removeCookies()
  }
  
  authenticated = async (request: NextRequest): Promise<{authenticated: boolean, authCookies?: AuthCookies}> => {
    const authToken = request.cookies.get("authToken")
    const expiresAt = request.cookies.get("expiresAt")
    const refreshToken = request.cookies.get("refreshToken")
  
    if (authToken?.value && expiresAt?.value) {
      const expiresDate = new Date(expiresAt.value).getTime() / 1000
      const currentDate = new Date(new Date().toUTCString()).getTime() / 1000
      if (expiresDate < currentDate && refreshToken) {
        return await this.handleRefreshToken(request)
      } else if (!refreshToken) {
        return { authenticated: false }
      } else {
        return { authenticated: true }
      }
    } else if (refreshToken?.value) {
      return await this.handleRefreshToken(request)
    }
    return {authenticated: false}
  }
  
  postRefreshToken = async (refreshToken: String) => {
    return this.post(`/refresh`, JSON.stringify({refreshToken})) 
  };
  
  handleRefreshToken = async (request: NextRequest): Promise<{authenticated: boolean, authCookies?: AuthCookies}> => {
    const cookiesRefreshToken = request.cookies.get("refreshToken")
    if (cookiesRefreshToken) {
      return this.postRefreshToken(cookiesRefreshToken.value).then((body) => {
        return {
          authenticated: true,
          authCookies: {
            authToken: body.token, refreshToken: body.refreshToken, expiresAt: body.expiresAt
          }
        }
      }).catch(() => {
        return {authenticated: false}
      })
    } else {
      return {authenticated: false}
    }
  }

  handleClientRefreshToken = async () => {
    const cookiesRefreshToken = cookies.get("refreshToken")
    if (cookiesRefreshToken) {
      return this.postRefreshToken(cookiesRefreshToken).then((body) => {
        this.setCookies(body.token, body.refreshToken, body.expiresAt)
        return true
      }).catch(() => {
        this.removeCookies()
        return false
      })
    } else {
      this.removeCookies()
      return false
    }
  }  
  
  setCookies = (token: string, refreshToken: string, expiresAt: string) => {
    const secure = process.env.NODE_ENV == 'production'
    const domain = ConfigService.getWebsocketDomain()
    cookies.set("authToken", token, { expires: 60 * 10 / 86400, secure, domain})
    cookies.set("refreshToken", refreshToken, { expires: 60 * 60 * 24 * 30 * 6 / 86400, secure, sameSite: "strict" })
    cookies.set("expiresAt", expiresAt, { expires: 60 * 10 / 86400, secure, sameSite: "strict"})
  }

  removeCookies = () => {
    cookies.remove("authToken")
    cookies.remove("refreshToken")
    cookies.remove("expiresAt")
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

const authService = new AuthService()
export default authService
