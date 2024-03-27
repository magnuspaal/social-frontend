"use client"

import useAutosizeTextArea from "@/hooks/use-auto-size-textarea";
import { useContext, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addPost } from "@/store/post-slice";
import useClientApiService from "@/services/client/client-api-service";
import Image from 'next/image'
import { AlertType, addAlert } from "@/store/alert-slice";
import { User, UserSettingsKey, UserSettingsValue } from "@/types/user";
import useTranslation from "@/lang/use-translation";
import { MeContext } from "@/providers/me-provider";

export default function SubmitPost() {

  const { t } = useTranslation()
  const dispatch = useAppDispatch();

  const clientApiService = useClientApiService()

  const { me } = useContext(MeContext)

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const inputFile = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.target?.value);
  };

  const openFileSelector = () => {
    inputFile.current?.click();
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
      let formData = new FormData();
      formData.append('content', value);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
      await clientApiService.createPost(formData)
        .then((post) => {
          removeImage()
          dispatch(addPost(post))
        })
        .catch((err) => {
          removeImage()
          dispatch(addAlert({message: t('post.messages.default'), type: AlertType.ERROR}))
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const removeImage = () => {
    setSelectedFile(null)
    setCurrentImage(null)
  }

  useEffect(() => {
    const selectedFileChanged = async () => {
      const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
      if (selectedFile) {
        if (validImageTypes.includes(selectedFile.type)) {
          const url = URL.createObjectURL(selectedFile)
          setCurrentImage(url)
        } else {
          return Promise.reject(t('post.messages.wrong_file_format'))
        }
      }
    }

    selectedFileChanged().catch((message) => {
      removeImage()
      dispatch(addAlert({message: message, type: AlertType.ERROR}))
    })
  }, [selectedFile]) 

  const renderPostImage = () => {
    if (currentImage) {
      return (
        <div className="mx-12 mb-5 mt-3 relative">
          <button onClick={removeImage} className="absolute top-2 right-2 rounded-full bg-background">
            <Image src="/close.svg" height={30} width={30} alt="Post image remove" className="" />
          </button>
          <Image 
            src={currentImage} 
            alt="Profile picture"
            height={2000}
            width={2000}
            quality={100}
            className="rounded-lg"
          />
        </div>
      )
    }
  }

  return (
    <div className="flex border border-black/40 border-b-4 border-b-black rounded mb-5 items-start overflow-hidden bg-background w-full">
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
              {renderPostImage()}
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center ml-3 px-4">
                  <button onClick={openFileSelector} disabled={postingDisallowed()} className={`image-post-button-hover ${selectedFile && "image-post-button-active"}
                  disabled:hover:cursor-not-allowed disabled:hover:filter-none`}>
                    <Image src="/img.svg" height={25} width={25} alt="Image post icon"></Image>
                  </button>
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

        <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={(e) => setSelectedFile(e?.target?.files ? e.target.files[0] : null)}/>
      </div>
    </div>
  )
}