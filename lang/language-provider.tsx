"use client"

import { createContext, useState } from "react"
import { defaultLocale } from "."
export const LanguageContext = createContext([])

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<any>(navigator?.language.substring(0,2) ?? defaultLocale)
  return (
    <LanguageContext.Provider value={[locale, setLocale]}>
      {children}
    </LanguageContext.Provider>
  )
}