

import { createContext } from "react"
import { defaultLocale } from "."
export const LanguageContext = createContext<{locale: any}>({locale: undefined})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContext.Provider value={{locale: defaultLocale}}>
      {children}
    </LanguageContext.Provider>
  )
}