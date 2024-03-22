"use client"

import useAutosizeTextArea from "@/hooks/use-auto-size-textarea";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useClientApiService from "@/services/client/client-api-service";
import { useAppDispatch } from "@/store/hooks";
import { addPost, updatePost } from "@/store/post-slice";
import { AlertType, addAlert } from "@/store/alert-slice";
import { User, UserSettingsKey, UserSettingsValue } from "@/types/user";
import useTranslation from "@/lang/use-translation";

export default function ReplyToPost({ postId, me, onPost, className }: { postId: number, me: User, onPost?: any, className?: string }) {

  const { t } = useTranslation()
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
          dispatch(addAlert({type: AlertType.SUCCESS, message: t('post.messages.reply_posted')}))
          if (onPost) {
            onPost()
          }
        })
    }
  }

  const validatePost = () => {
    if (value.length < 1) {
      dispatch(addAlert({type: AlertType.ERROR, message: t('post.messages.too_short')}))
      return false
    } else if (value.length >= 1000) {
      dispatch(addAlert({type: AlertType.ERROR, message: t('post.messages.too_long')}))
      return false
    }
    return true
  }

  const postingDisallowed = () => {
    return me.settings.some((setting) => setting.key === UserSettingsKey.POSTING_DISALLOWED && setting.value === UserSettingsValue.ENABLED)
  }

  return (
    <div className={`flex pb-3 pt-3 items-end max-w-4 bg-background ${className}`}>
      <textarea 
        onChange={handleChange} 
        placeholder={t('post.reply')}
        className="h-[52px] textarea w-full overflow-auto m-h-10 p-3 text-xl resize-none h-14 overflow-hidden bg-background focus:outline-0"
        id="multiliner" 
        name="multiliner"
        ref={textAreaRef}
        value={value}
        disabled={postingDisallowed()}
      ></textarea>
      <button className="rounded bg-primary p-3 font-bold hover:bg-secondary max-h-12 text-white uppercase disabled:hover:bg-primary disabled:hover:text-white" 
        disabled={postingDisallowed()} onClick={submitPost}>{t('post.post')}
      </button>
    </div>
  )
}