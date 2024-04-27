import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import CloseSvg from '@/components/svg/CloseSvg';
import ImgSvg from '@/components/svg/ImgSvg';
import { useAppDispatch } from '@/store/hooks';
import { AlertType, addAlert } from '@/store/alert-slice';
import useTranslation from '@/lang/use-translation';

export default function useImageInput() {

  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const inputFile = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [currentImage, setCurrentImage] = useState<string | null>(null)

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

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const eventTarget = e.target as HTMLInputElement
    setSelectedFile(eventTarget.files ? eventTarget.files[0] : null)
  }
  
  const removeImage = () => {
    if (inputFile.current) {
      inputFile.current.value = ''
    }
    setSelectedFile(null)
    setCurrentImage(null)
  }

  const openFileSelector = () => {
    inputFile.current?.click();
  };

  const renderImage = useCallback((className: string, size: number) => {
    if (currentImage) {
      return (
        <div className={`flex ${className} relative`}>
          <button onClick={removeImage} className="absolute top-2 left-2 rounded-full bg-background">
            <CloseSvg size={30}></CloseSvg>
          </button>
          <img
            src={currentImage} 
            alt="Image to upload"
            height={size}
            width={size}
            className="rounded-lg"
          />
        </div>
      )
    }
  }, [currentImage])

  const renderImageButton = useCallback((className: string, color?: string, disabled?: boolean) => {
    return (
      <button onClick={openFileSelector} 
        className={`image-post-button-hover ${selectedFile && "image-post-button-active"}
          disabled:hover:cursor-not-allowed disabled:hover:filter-none ${className}`}
        disabled={disabled}
      >
          <ImgSvg size={25} color={color} />
      </button>
    )
  }, [selectedFile])

  const renderImageInput = useCallback(() => {
    return <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={onImageChange}/>
  }, [])

  return { selectedFile, currentImage, renderImage, renderImageButton, renderImageInput, removeImage }
}