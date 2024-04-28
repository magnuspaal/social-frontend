import Loading from "@/components/common/Loading";
import ChatWindow from "@/components/chat/ChatWindow";
import useMessagingService from "@/services/messaging-service";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeChat, setChat } from "@/store/messaging-slice";

export default function ChatRoom() {

  const { id } = useParams();

  const dispatch = useAppDispatch()
  const messagingService = useMessagingService()

  const chat = useAppSelector((state) => state.messaging.chat)

  useEffect(() => {
    const getChat = async () => {
      if (id) {
        dispatch(setChat(await messagingService.getChat(parseInt(id))))
      }
    }
    getChat()

    return (() => {
      dispatch(removeChat())
    })
  }, [])

  return (
    <>
      { chat ? <ChatWindow chat={chat}/> :
        <div className='flex justify-center items-center h-full w-full'>
          <Loading size={75} borderWidth={8}/>
        </div>
      }
    </>
  )
}