'use client'

import { ConfigService } from "@/services/config-service";
import { Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";

const useMessagingClient = () => {
    const websocketUrl = ConfigService.getWebsocketUrl()

    const [client, setClient] = useState<Client>()

    useEffect(() => {
      const stompClient = new Client({
        webSocketFactory: () => new SockJS(websocketUrl),
        onConnect: () => {
          setClient(stompClient)
        }
      });
      
      stompClient.activate()

      return () => {
        stompClient.deactivate()
      }
    }, [websocketUrl])

    return client
} 

export default useMessagingClient;