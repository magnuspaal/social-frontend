"use client"

import { createContext, useState } from "react"
import { User } from "@/types/user"
export const MeContext = createContext<{me: User | undefined}>({me: undefined})

export function MeProvider({ children, user }: { children: React.ReactNode, user: User }) {
  const [me] = useState<User>(user)

  return ( 
    <MeContext.Provider value={{me}}>
      {children}
    </MeContext.Provider>
  )
}