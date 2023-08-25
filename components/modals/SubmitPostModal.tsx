'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSubmitPostOverlay } from '@/store/navigation-slice'
import Image from 'next/image'
import ReplyToPost from '../input/ReplyToPost'
import SinglePost from '../post/SinglePost'
import useDisableScroll from '@/hooks/use-disable-scroll'

export default function SubmitPostModal({dict}: {dict: any}) {

  const modalOpen = useAppSelector<boolean>((state) => state.navigation.submitPostOverlay.open)
  const replyParent = useAppSelector((state) => state.navigation.submitPostOverlay.replyParent)

  const dispatch = useAppDispatch()

  useDisableScroll(modalOpen)

  const closeOverlay = () => {
    dispatch(setSubmitPostOverlay({open: false}))
  }
  
  const renderReplyInput = () => {
    return (
      <div className='flex flex-col justify-center w-full max-w-[600px] h-full'>
        <button onClick={closeOverlay} className="bg-background rounded-t pt-3 px-3 flex justify-end">
          <Image src="/close.svg" height={30} width={30} alt="Close overlay" />
        </button>
        <SinglePost 
          dict={dict}
          post={replyParent!} 
          clickable={false} 
          clickableHeader={false} 
          clickablePicture={false} 
          clickableReplyHeader={false} 
          includePostActions={false} 
          includeReplyHeader={false}
          includeRepostHeader={false}
          className='flex flex-col rounded-b mb-4 pb-5'
        />
        <ReplyToPost dict={dict} postId={replyParent!.id} className='rounded px-3' refresh={false} onPost={closeOverlay}/>
      </div>
    )
  }

  return modalOpen && (
    <div className="fixed w-full h-screen top-0 flex justify-center bg-black/80 h-screen py-20 z-40">
      { 
        replyParent &&
        renderReplyInput()
      }
    </div>
  )
}