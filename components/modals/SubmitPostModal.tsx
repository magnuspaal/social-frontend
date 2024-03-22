'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSubmitPostOverlay } from '@/store/navigation-slice'
import Image from 'next/image'
import ReplyToPost from '../input/ReplyToPost'
import SinglePost from '../post/SinglePost'
import useDisableScroll from '@/hooks/use-disable-scroll'
import { User } from '@/types/user'

export default function SubmitPostModal({me}: {me: User}) {

  const modalOpen = useAppSelector<boolean>((state) => state.navigation.submitPostOverlay.open)
  const replyParent = useAppSelector((state) => state.navigation.submitPostOverlay.replyParent)

  const dispatch = useAppDispatch()

  useDisableScroll(modalOpen)

  const closeOverlay = () => {
    dispatch(setSubmitPostOverlay({open: false}))
  }
  
  const renderReplyInput = () => {
    return (
      <div className='flex flex-col w-full max-w-[600px] h-full max-sm:bg-background justify-center'>
        <div className='sm:hidden border border-black/30' />
        <SinglePost 
          post={replyParent!} 
          clickable={false} 
          clickableHeader={false} 
          clickablePicture={false} 
          clickableReplyHeader={false} 
          includePostActions={false} 
          includeReplyHeader={false}
          includeRepostHeader={false}
          className='flex flex-col rounded sm:mb-2'
        >
          <button onClick={closeOverlay} className="absolute top-2 right-2 flex justify-end">
            <Image src="/close.svg" height={30} width={30} alt="Close overlay" />
          </button>
        </SinglePost>
        <div className='sm:hidden border border-black/30' />
        <ReplyToPost postId={replyParent!.id} me={me} className='rounded px-3' onPost={closeOverlay}/>
      </div>
    )
  }

  return modalOpen && (
    <div className="fixed w-full h-screen top-0 flex justify-center bg-black/80 h-screen sm:py-20 z-40">
      { 
        replyParent &&
        renderReplyInput()
      }
    </div>
  )
}