"use client"

import { Dispatch, SetStateAction, createContext, useState } from "react"
import { User } from "@/types/user"
export const MeContext = createContext<{
  me: User | undefined, 
  setMe: Dispatch<SetStateAction<User | undefined>> | undefined
}>({me: undefined, setMe: undefined})

export function MeProvider({ children, user }: { children: React.ReactNode, user: User }) {
  const [me, setMe] = useState<User | undefined>(user)

  return ( 
    <MeContext.Provider value={{me, setMe}}>
      {children}
    </MeContext.Provider>
  )
}