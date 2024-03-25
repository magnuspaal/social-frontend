import { NextRequest } from "next/server";
import { AbstractApiService } from "../abstract-api-service";
import { ConfigService } from "../config-service";

class ServerAuthService extends AbstractApiService {

  constructor() {
    super(ConfigService.getAuthApiUrl())
  }

  getApiHeaders = () => {
    return {
      "Content-Type": "application/json"
    }
  }

  authenticated = async (request: NextRequest): Promise<{authenticated: boolean, authCookies?: AuthCookies}> => {
    const authToken = request.cookies.get("authToken")
    const expiresAt = request.cookies.get("expiresAt")
    const refreshToken = request.cookies.get("refreshToken")
  
    if (authToken?.value && expiresAt?.value) {
      const expiresDate = new Date(expiresAt.value).getTime() / 1000
      const currentDate = new Date(new Date().toUTCString()).getTime() / 1000
      if (expiresDate < currentDate && refreshToken) {
        return await this.handleServerRefreshToken(request)
      } else if (!refreshToken) {
        return { authenticated: false }
      } else {
        return { authenticated: true }
      }
    } else if (refreshToken?.value) {
      return await this.handleServerRefreshToken(request)
    }
    return {authenticated: false}
  }
  
  postRefreshToken = async (refreshToken: String) => {
    return this.post(`/refresh`, JSON.stringify({refreshToken})) 
  };
  
  handleServerRefreshToken = async (request: NextRequest): Promise<{authenticated: boolean, authCookies?: AuthCookies}> => {
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

const serverAuthService = new ServerAuthService()
export default serverAuthService
