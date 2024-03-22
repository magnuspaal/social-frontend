import { User } from "./user"

export interface UserEncryption {
  version: number
  user: User
  encryptedPrivateKey: string
  salt: string
  iv: string
}