import { MutableRefObject, createContext, useRef } from "react"

export const NavigationContext = createContext<{
  fileInputOpen: MutableRefObject<boolean> | undefined
}>({fileInputOpen: undefined})

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const fileInputOpen = useRef<boolean>(false)

  return ( 
    <NavigationContext.Provider value={{fileInputOpen}}>
      {children}
    </NavigationContext.Provider>
  )
}