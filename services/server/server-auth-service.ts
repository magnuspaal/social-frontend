import { NextRequest } from "next/server";
import { ConfigService } from "../config-service";
import { AbstractServerApiService } from "./abstract-server-api-service";
import { logInfo } from "@/utils/development-utils";
import { isValidJWT } from "@/utils/auth/jwt-utils";

class ServerAuthService extends AbstractServerApiService {

  constructor() {
    super(ConfigService.getAuthApiUrl(), false)
  }

  postRefreshToken = async (refreshToken: String): Promise<{token: string, refreshToken: string, expiresAt: string}> => 
    this.post(`/refresh`, JSON.stringify({refreshToken}))

  handleServerRefreshToken = async (refreshToken: string): Promise<{authenticated: boolean, authCookies?: AuthCookies}> => {
    return this.postRefreshToken(refreshToken).then((body) => {
      return {
        authenticated: true,
        authCookies: {
          authToken: body.token, refreshToken: body.refreshToken, expiresAt: body.expiresAt
        }
      }
    }).catch(() => {
      return {authenticated: false}
    })
  }

  authenticated = async (request: NextRequest): Promise<{authenticated: boolean, authCookies?: AuthCookies}> => {
    const authToken = request.cookies.get("authToken")
    const expiresAt = request.cookies.get("expiresAt")
    const refreshToken = request.cookies.get("refreshToken")

    const isValidAuthToken = await isValidJWT(authToken?.value)
    const isValidRefreshToken = await isValidJWT(refreshToken?.value)
  
    if (isValidAuthToken && expiresAt?.value) {
      const expiresDate = new Date(expiresAt.value).getTime() / 1000
      const currentDate = new Date(new Date().toUTCString()).getTime() / 1000
      if (expiresDate - 5 < currentDate && isValidRefreshToken) {
        logInfo("Server token refresh")
        return this.handleServerRefreshToken(refreshToken!.value)
      } else if (!refreshToken) {
        logInfo("Server no refresh token - middleware!")
        return { authenticated: false }
      } else {
        return { authenticated: true }
      }
    } else if (isValidRefreshToken) {
      return this.handleServerRefreshToken(refreshToken!.value)
    }
    return { authenticated: false }
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
