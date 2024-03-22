"use client"

import { createContext, useState } from "react"
import { defaultLocale } from "."
export const LanguageContext = createContext<{locale: any}>({locale: undefined})

export function LanguageProvider({ children, language }: { children: React.ReactNode, language: string | null }) {
  const [locale] = useState<any>(language?.substring(0,2) ?? defaultLocale)

  return (
    <LanguageContext.Provider value={{locale}}>
      {children}
    </LanguageContext.Provider>
  )
}