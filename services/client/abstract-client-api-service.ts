'use client'

import { AbstractApiService } from "../abstract-api-service";
import cookies from "js-cookie";
import { ConfigService } from "../config-service";
import { isProduction, logInfo, logVerbose } from "@/utils/development-utils";

export abstract class AbstractClientApiService extends AbstractApiService {

  constructor(apiUrl: string, refreshToken?: boolean) {
    super(apiUrl, refreshToken)
  }

  handleResponseError = async (res: Response): Promise<boolean | null> => {
    if (res.status == 404) {
      return Promise.resolve(null)
    } else if (![200, 201].includes(res.status)) {
      const body = await res.json().catch(() => console.error("No body on request"))
      if (body?.codes) {
        return Promise.reject(body.codes)
      }
    }
    return Promise.resolve(false)
  }

  postRefreshToken = async (refreshToken: String) => 
    fetch(ConfigService.getAuthApiUrl() + "/refresh", 
      {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({refreshToken})}
    )
      .then(async (res: Response) => {
        logInfo("Called:", ConfigService.getAuthApiUrl() + "/refresh", res.status)
        if (res.ok) {
          const body = await res.json()
          logVerbose("Fetch body:", body)
          return body
        }
      }).catch(async (error) => {
        console.log(error)
      })

  handleTokenRefresh = async (): Promise<{authenticated: boolean, authToken?: string}> => {
    const cookiesRefreshToken = cookies.get("refreshToken")
    if (cookiesRefreshToken) {
      return this.postRefreshToken(cookiesRefreshToken).then((body) => {
        this.setAuthCookies(body.token, body.refreshToken, body.expiresAt)
        return {authenticated: true, authToken: body.token}
      }).catch(() => {
        this.removeLocalData()
        return {authenticated: false}
      })
    } else {
      this.removeLocalData()
      return {authenticated: false}
    }
  };

  setAuthCookies = (token: string, refreshToken: string, expiresAt: string, ) => {
    const secure = isProduction()
    const domain = ConfigService.getWebsocketDomain()
    cookies.set("authToken", token, { expires: 60 * 10 / 86400, secure, domain})
    cookies.set("refreshToken", refreshToken, { expires: 60 * 60 * 24 * 30 * 6 / 86400, secure, sameSite: "lax" })
    cookies.set("expiresAt", expiresAt, { expires: 60 * 60 * 24 * 30 * 6 / 86400, secure, sameSite: "lax"})
  }

  removeLocalData = () => {
    cookies.remove("authToken")
    cookies.remove("refreshToken")
    cookies.remove("expiresAt")
    localStorage.removeItem("privateKey")
  }

  isTokenExpired = (): Promise<boolean> => {
    const expiresAt = cookies.get("expiresAt")
    if (expiresAt) {
      const expiresDate = new Date(expiresAt).getTime() / 1000
      const currentDate = new Date(new Date().toUTCString()).getTime() / 1000
      if (expiresDate - 5 > currentDate) {
        return Promise.resolve(false)
      }
    }
    return Promise.resolve(true)
  }
}