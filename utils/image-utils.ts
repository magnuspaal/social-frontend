
const imageApiUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL

export const imageLoader = ({ src }: { src: string }) => {
  if (src.startsWith('public')) {
    return ''
  } else {
    return `${imageApiUrl}/${src}`
  }
}

export const getImageAddress = (src: string) => {
  return `${imageApiUrl}/${src}`
}