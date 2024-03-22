'use client'

import useClientApiService from "@/services/client/client-api-service";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { useAppDispatch } from "@/store/hooks";
import { AlertType, addAlert } from "@/store/alert-slice";
import { ImageSize, getImageAddress } from "@/utils/image-utils";
import useTranslation from "@/lang/use-translation";


export default function ProfileImageUpload({ user }: {user: User}) {

  const { t } = useTranslation()
  const clientApiService = useClientApiService()
  const dispatch = useAppDispatch();
  const router = useRouter()

  const inputFile = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null)

  const onButtonClick = () => {
    inputFile.current?.click();
  };

  useEffect(() => {
    const selectedFileChanged = async () => {
      const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
      if (selectedFile) {
        if (validImageTypes.includes(selectedFile.type)) {
          const img = new Image();
          const url = URL.createObjectURL(selectedFile)
          img.src = url;
          return new Promise((resolve, reject) => {
            img.onload = () => {
              const width = img.width;
              const height = img.height;
              if (width - height > -10 && width - height < 10) {
                resolve(setCurrentImage(url))
              } else {
                reject("Image should be square")
              }
            }
          })
        } else {
          return Promise.reject(t('settings.messages.wrong_file_format'))
        }
      }
    }

    const uploadImage = async () => {
      if (selectedFile) {
        let formData = new FormData();
        formData.append('image', selectedFile as Blob);
        return await clientApiService.uploadProfileImage(user.id, formData).then((res: any) => {
          if (!res) {
            setCurrentImage(null)
          }
          return res
        })
      }
    }

    selectedFileChanged().then(async () => {
      const res = await uploadImage()
      if (res) {
        dispatch(addAlert({message: t('settings.uploaded'), type: AlertType.SUCCESS}))
        router.refresh()
      } 
    }).catch((err) => {
      dispatch(addAlert({message: err, type: AlertType.ERROR}))
      setSelectedFile(null)
    })
  }, [selectedFile]) 

  return (
    <div className="flex flex-col items-center justify-center m-4">
      <button onClick={onButtonClick} className="flex flex-col items-center">
        <div className="rounded border-2 border-black p-1 w-fit rounded-full fit-content">
          <NextImage 
            src={currentImage ?? `${user.imageName ? getImageAddress(user.imageName, ImageSize.SM) : `/blank-profile-picture.svg`}`} 
            alt="Profile picture"
            height={100}
            width={100}
            quality={100}
            className="rounded-full"
          />
        </div>
        <div className="text-sm mt-4">{t('settings.change_profile_picture')}</div>
      </button>

      <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={(e) => setSelectedFile(e?.target?.files ? e.target.files[0] : null)}/>
    </div>
  )
}