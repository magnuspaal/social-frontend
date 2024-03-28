import { ConfigService } from "@/services/config-service";
import * as jose from 'jose'

export async function isValidJWT(token: string | undefined) {
  const JWT_SECRET = ConfigService.getJwtSecret()

  return new Promise(async (resolve) => {
    if (!token) {
      return resolve(false)
    }

    try {
      const key = await jose.importJWK(
        {
          kid: "test-key",
          alg: "HS256",
          use: "sig",
          k: JWT_SECRET,
          kty: "oct"
        }
      )

      const decoded = await jose.jwtVerify(token, key)
      if (decoded.payload?.id) {
        resolve(true)
      } else {
        resolve(false)
      }
    } catch (err) {
      resolve(false)
    }
  });
}