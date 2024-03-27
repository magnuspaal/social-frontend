"use client"

import { Dispatch, SetStateAction, createContext, useState } from "react"
import { User } from "@/types/user"
export const MeContext = createContext<{
  me: User | null, 
  setMe: Dispatch<SetStateAction<User | null>> | null
}>({me: null, setMe: null})

export function MeProvider({ children, user }: { children: React.ReactNode, user: User }) {
  const [me, setMe] = useState<User | null>(user)

  return ( 
    <MeContext.Provider value={{me, setMe}}>
      {children}
    </MeContext.Provider>
  )
}