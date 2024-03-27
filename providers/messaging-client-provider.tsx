"use client"

import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react"

import { Client } from "@stomp/stompjs"
import { ConfigService } from "@/services/config-service"
import SockJS from "sockjs-client"
import useMessagingHandler from "@/hooks/use-messaging-handler"

export const MessagingClientContext = createContext<{
  client: Client | undefined, 
  setClient: Dispatch<SetStateAction<Client | undefined>> | undefined
}>({client: undefined, setClient: undefined})

export function MessagingClientProvider({children}: {children: React.ReactNode}) {

  const websocketUrl = ConfigService.getWebsocketUrl()

  const [client, setClient] = useState<Client>()

  useMessagingHandler(
    client
  )

  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS(websocketUrl),
      onConnect: () => {
        process.env.NODE_ENV == 'development' && console.log("Stomp Client Connected")
        setClient(stompClient)
      }
    });
    
    stompClient.activate()

    return () => {
      process.env.NODE_ENV == 'development' && console.log("Stomp Client Disconnected")
      stompClient.deactivate()
    }
  }, [])

  return ( 
    <MessagingClientContext.Provider value={{client, setClient}}>
      {children}
    </MessagingClientContext.Provider>
  )
}