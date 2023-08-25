'use client'

import useDisableScroll from '@/hooks/use-disable-scroll'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { clearOverlayImage } from '@/store/navigation-slice'
import { ImageSize, getImageAddress } from '@/utils/image-utils'
import Image from 'next/image'
import { useEffect } from 'react'

export default function ImageOverlay() {

  const overlayImage = useAppSelector<string>((state) => state.navigation.overlayImage)
  const ratio = Number(overlayImage.split('.')[0].split('-')[1])

  const dispatch = useAppDispatch()

  useDisableScroll(!!overlayImage)

  const closeOverlay = () => {
    dispatch(clearOverlayImage())
  }

  return overlayImage && (
    <div className="fixed w-full h-full top-0 flex justify-center bg-black/80 h-screen py-20 z-40">
      <button onClick={closeOverlay} className="absolute top-10 right-10 rounded-full bg-background">
        <Image src="/close.svg" height={30} width={30} alt="Post image remove" className="" />
      </button>
      <Image 
        src={getImageAddress(overlayImage, ImageSize.LG)} 
        width={1000} 
        height={1000 / (ratio / 100000)} 
        quality={100} alt="Image overlay" 
        className='object-contain'
      />
    </div>
  )
}