

import useAutosizeTextArea from "@/hooks/use-auto-size-textarea";
import { useContext, useRef, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addPost } from "@/store/post-slice";
import useApiService from "@/services/api-service";

import { AlertType, addAlert } from "@/store/alert-slice";
import { UserSettingsKey, UserSettingsValue } from "@/types/user";
import useTranslation from "@/lang/use-translation";
import { MeContext } from "@/providers/me-provider";
import useImageInput from "@/hooks/use-image-input";

export default function SubmitPost() {

  const { t } = useTranslation()
  const dispatch = useAppDispatch();

  const apiService = useApiService()

  const { me } = useContext(MeContext)

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const { selectedFile, removeImage, renderImage, renderImageButton, renderImageInput } = useImageInput()

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.target?.value);
  };

  const validatePost = () => {
    if (!selectedFile && value.length < 1) {
      dispatch(addAlert({type: AlertType.ERROR, message: t('post.messages.too_short')}))
      return false
    } else if (value.length >= 1000) {
      dispatch(addAlert({type: AlertType.ERROR, message: t('post.messages.too_long')}))
      return false
    }
    return true
  }

  const postingDisallowed = () => {
    return me?.settings.some((setting) => 
      setting.key === UserSettingsKey.POSTING_DISALLOWED 
      && setting.value === UserSettingsValue.ENABLED
    )
  }

  const submitPost = async () => {
    if (validatePost()) {
      setValue("")
      setLoading(true)
      const formData = new FormData();
      formData.append('content', value);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
      await apiService.createPost(formData)
        .then((post) => {
          removeImage()
          dispatch(addPost(post))
        })
        .catch(() => {
          removeImage()
          dispatch(addAlert({message: t('post.messages.default'), type: AlertType.ERROR}))
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <div className="flex shadow-up border-b-4 border-b-black sm:rounded-md mb-5 items-start overflow-hidden bg-background w-full">
      <div className="flex flex-col w-full">
          {
            loading ?
            <div className="flex justify-center p-6"> 
              <span className="loader"></span>
            </div>
            :
            <div className="flex flex-col justify-end">
              <textarea 
                onChange={handleChange} 
                placeholder={t('post.placeholder')}
                className="h-[28px] overflow-auto pl-10 pr-10 mt-10 mb-4 text-xl resize-none overflow-hidden bg-background focus:outline-0 w-full disabled:hover:cursor-not-allowed" 
                id="multiliner" 
                name="multiliner"
                ref={textAreaRef}
                value={value}
                disabled={postingDisallowed()}
              />
              {renderImage("mx-12 my-5", 2000)}
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center ml-3 px-4">
                  {renderImageButton("", "black", postingDisallowed())}
                </div>
                <button 
                  className="rounded-tl bg-primary p-3 font-bold hover:bg-secondary hover:text-black max-h-12 text-white uppercase 
                    disabled:hover:bg-primary disabled:hover:text-white disabled:hover:cursor-not-allowed" 
                  disabled={postingDisallowed()} 
                  onClick={submitPost}>
                    {t('post.post')}
                </button>
              </div>
            </div>
          }
        {renderImageInput()}
      </div>
    </div>
  )
}