import { ConfigService } from '@/services/config-service'

const imageApiUrl = ConfigService.getFileApiUrl()

export enum ImageSize {
  XS = "xs",
  SM = "sm",
  LG = "lg"
}

export const imageLoader = ({ src }: { src: string }) => {
  if (src.startsWith('public')) {
    return ''
  } else {
    return `${imageApiUrl}/${src}`
  }
}

export const getImageAddress = (name: string, size?: ImageSize) => {
  if (!size) {
    return `${imageApiUrl}/${name}`
  } else {
    return `${imageApiUrl}/${size}/${name}`
  }
}