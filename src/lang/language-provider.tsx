

import { createContext } from "react"
import { defaultLocale } from "."
export const LanguageContext = createContext<{locale: any}>({locale: undefined})

export function LanguageProvider({ children }: { children: React.ReactNode }) {

  const lang = navigator.language.substring(0,2)

  return (
    <LanguageContext.Provider value={{locale: lang ?? defaultLocale}}>
      {children}
    </LanguageContext.Provider>
  )
}