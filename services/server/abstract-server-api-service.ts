import { AbstractApiService } from "../abstract-api-service";
import { cookies } from "next/headers";

export abstract class AbstractServerApiService extends AbstractApiService {

  constructor(apiUrl: string, refreshToken?: boolean) {
    super(apiUrl, refreshToken)
  }

  getApiHeaders = () => {
    const authToken = cookies().get("authToken")
    return {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + authToken?.value,
    }
  }

  handleResponseError = async (res: Response): Promise<boolean> => {
    return Promise.resolve(false)
  }

  isTokenExpired = (): Promise<boolean> => {
    const expiresAt = cookies().get("expiresAt")
    if (expiresAt?.value) {
      const expiresDate = new Date(expiresAt.value).getTime() / 1000
      const currentDate = new Date(new Date().toUTCString()).getTime() / 1000
      if (expiresDate > currentDate) {
        return Promise.resolve(false)
      }
    }
    return Promise.resolve(true)
  }
}