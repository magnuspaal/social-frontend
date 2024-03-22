import { defaultLocale } from '.';
import * as en from './locales/en.json';
import * as et from './locales/et.json'
import { headers } from 'next/headers'

export default function t(key: string) {
  const dictionaries: Record<string, any> = {
    en,
    et
  }
  
  const locale = headers().get('accept-language')?.substring(0,2) || defaultLocale

  let last = dictionaries[locale] ?? dictionaries[defaultLocale]

  for (const subKey of key.split('.')) {
    last = last[subKey]
    if (!last) {
      console.warn(`No string '${key}' for locale '${locale}'`)
      break
    }
  }

  return last || ""
}