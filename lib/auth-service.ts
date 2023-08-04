'use client'

import cookies from "js-cookie";
import { NextRequest } from "next/server";
import { AbstractApiService } from "./abstract-api-service";

const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL ?? "http://localhost:8080/api/v1/auth"
const apiKey = process.env.NEXT_PUBLIC_AUTH_API_KEY ?? "test"

class AuthService extends AbstractApiService {
  getApiHeaders = () => {
    return {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json"
    }
  }

  postRegister = async (username: String, password: String) => {
    return this.post(`${apiUrl}/register`, JSON.stringify({username, password})
    ).then(async (body) => {
      this.setCookies(body.token, body.refreshToken, body.expiresAt)
    })
  }

  postLogin = async (email: String, password: String) => {
    return this.post(`${apiUrl}/authenticate`, JSON.stringify({email, password})
    ).then(async (body) => {
      this.setCookies(body.token, body.refreshToken, body.expiresAt)
    })
  }

  logout = async () => {
    this.removeCookies()
  }
  
  authenticated = async (request: NextRequest) => {
    const authToken = request.cookies.get("authToken")
    const expiresAt = request.cookies.get("expiresAt")
  
    if (authToken?.value && expiresAt?.value) {
      const expiresDate = new Date(expiresAt.value).getTime()
      const currentDate = new Date(new Date().toUTCString()).getTime()
      if (expiresDate < currentDate) {
        return await this.handleRefreshToken(request)
      } else {
        return true
      }
    }
    return false
  }
  
  postRefreshToken = async (refreshToken: String) => {
    return this.post(`${apiUrl}/refresh`, JSON.stringify({refreshToken})) 
  };
  
  handleRefreshToken = async (request: NextRequest) => {
    const cookiesRefreshToken = request.cookies.get("refreshToken")
    if (cookiesRefreshToken) {
      return this.postRefreshToken(cookiesRefreshToken.value).then((body) => {
        this.setHeaderCookies(request, body.token, body.refreshToken, body.expiresAt)
        return true
      }).catch(() => {
        this.removeHeaderCookies(request)
        return false
      })
    } else {
      this.removeHeaderCookies(request)
      return false
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
  
  removeHeaderCookies = (request: NextRequest) => {
    request.cookies.delete("authToken")
    request.cookies.delete("refreshToken")
    request.cookies.delete("expiresAt")
  }
  
  setHeaderCookies = (request: NextRequest, token: string, refreshToken: string, expiresAt: string) => {
    request.cookies.set("authToken", token)
    request.cookies.set("refreshToken", refreshToken)
    request.cookies.set("expiresAt", expiresAt)
  }
  
  setCookies = (token: string, refreshToken: string, expiresAt: string) => {
    cookies.set("authToken", token)
    cookies.set("refreshToken", refreshToken)
    cookies.set("expiresAt", expiresAt)
  }

  removeCookies = () => {
    cookies.remove("authToken")
    cookies.remove("refreshToken")
    cookies.remove("expiresAt")
  }

  handleError = (res: Response) => {
    if (res.url.includes('/refresh')) {
      throw new Error("Refreshing token failed")
    }
    if ([401, 403].includes(res.status)) {
      throw new Error("Wrong username or password")
    }
    return Promise.resolve(false)
  }
}

const authService = new AuthService()
export default authService
