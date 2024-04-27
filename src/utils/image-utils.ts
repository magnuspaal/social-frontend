const imageApiUrl = import.meta.env.VITE_FILE_API_URL
const imageApiMedia = import.meta.env.VITE_FILE_API_MEDIA

export enum ImageSize {
  XS = "xs",
  SM = "sm",
  LG = "lg"
}

export const imageLoader = ({ src }: { src: string }) => {
  if (src.startsWith('public')) {
    return ''
  } else {
    return `${imageApiUrl}/${imageApiMedia}/${src}`
  }
}

export const getImageAddress = (name: string, size?: ImageSize) => {
  if (!size) {
    return `${imageApiUrl}/${imageApiMedia}/${name}`
  } else {
    return `${imageApiUrl}/${imageApiMedia}/${size}/${name}`
  }
}