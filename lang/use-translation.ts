import { useContext } from "react"
import { LanguageContext } from "./language-provider"
import * as en from './locales/en.json';
import * as et from './locales/et.json'
import { defaultLocale } from ".";

export default function useTranslation() {
  const dictionaries: Record<string, any> = {
    en,
    et
  }
  
  const [locale] = useContext(LanguageContext)

  function t(key: string) {

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
  return { t, locale }
}