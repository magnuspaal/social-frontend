"use client"

import useAutosizeTextArea from "@/hooks/use-auto-size-textarea";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useClientApiService from "@/services/client-api-service";
import { useAppDispatch } from "@/store/hooks";
import { addPost, updatePost } from "@/store/post-slice";
import { AlertType, addAlert } from "@/store/alert-slice";

export default function ReplyToPost({ dict, postId, onPost, className }: { dict: any, postId: number, onPost?: any, className?: string }) {

  const router = useRouter()
  const dispatch = useAppDispatch()
  const clientApiService = useClientApiService()

  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.target?.value);
  };

  const submitPost = async () => {
    if (validatePost()) {
      setValue("")
      let formData = new FormData();
      formData.append('content', value);
      await clientApiService.postReply(formData, postId)
        .then((response) => {
          dispatch(updatePost(response.replyParent))
          if (response.reply) {
            dispatch(addPost(response.reply))
          }
          router.refresh()
          dispatch(addAlert({type: AlertType.SUCCESS, message: dict.post.messages.reply_posted}))
          if (onPost) {
            onPost()
          }
        })
    }
  }

  const validatePost = () => {
    if (value.length < 1) {
      dispatch(addAlert({type: AlertType.ERROR, message: dict.post.messages.too_short}))
      return false
    } else if (value.length >= 1000) {
      dispatch(addAlert({type: AlertType.ERROR, message: dict.post.messages.too_long}))
      return false
    }
    return true
  }

  return (
    <div className={`flex pb-3 pt-3 items-end max-w-4 bg-background ${className}`}>
      <textarea 
        onChange={handleChange} 
        placeholder={dict.post.reply}
        className="h-[52px] textarea w-full overflow-auto m-h-10 p-3 text-xl resize-none h-14 overflow-hidden bg-background focus:outline-0" 
        id="multiliner" 
        name="multiliner"
        ref={textAreaRef}
        value={value}
      ></textarea>
      <button className="rounded bg-primary p-3 font-bold hover:bg-secondary max-h-12 text-white uppercase" onClick={submitPost}>{dict.post.post}</button>
    </div>
  )
}