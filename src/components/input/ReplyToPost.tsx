

import useAutosizeTextArea from "@/hooks/use-auto-size-textarea";
import { useContext, useRef, useState } from "react";
import useApiService from "@/services/api-service";
import { useAppDispatch } from "@/store/hooks";
import { addPost, updatePost } from "@/store/post-slice";
import { AlertType, addAlert } from "@/store/alert-slice";
import { UserSettingsKey, UserSettingsValue } from "@/types/user";
import useTranslation from "@/lang/use-translation";
import { MeContext } from "@/providers/me-provider";

export default function ReplyToPost({ postId, onPost, className = "" }: { postId: number, onPost?: any, className?: string }) {

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const apiService = useApiService()

  const { me } = useContext(MeContext)

  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.target?.value);
  };

  const submitPost = async () => {
    if (validatePost()) {
      setValue("")
      const formData = new FormData();
      formData.append('content', value);
      await apiService.postReply(formData, postId)
        .then((response) => {
          response.reply.options = { animate: true }
          dispatch(updatePost(response.replyParent))
          if (response.reply) {
            dispatch(addPost(response.reply))
          }
          
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
    return me?.settings.some((setting) => setting.key === UserSettingsKey.POSTING_DISALLOWED && setting.value === UserSettingsValue.ENABLED)
  }

  return (
    <div className={`flex pb-3 pt-3 items-end max-w-4 bg-background ${className}`}>
      <textarea 
        onChange={handleChange} 
        placeholder={t('post.reply')}
        className="h-[52px] textarea w-full overflow-auto p-3 text-xl resize-none h-14 overflow-hidden bg-background focus:outline-0"
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