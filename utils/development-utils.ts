import { getPrettyTimeString } from "./date-utils"

export const isProduction = () => {
  return process.env.NODE_ENV === 'production'
}

export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development'
}

export const logInfo = (...log: any) => {
  isDevelopment() && console.log(getPrettyTimeString(new Date()) + ":", ...log)
}

export const logVerbose = (...log: any) => {
  isDevelopment() && console.debug(getPrettyTimeString(new Date()) + ":", ...log)
}