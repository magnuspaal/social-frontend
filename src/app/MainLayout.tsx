import LeftSideBar from '@/components/left-side-bar/LeftSideBar'
import AlertModal from '@/components/modals/AlertModal'
import ImageOverlay from '@/components/modals/ImageOverlay'
import SubmitPostModal from '@/components/modals/SubmitPostModal'
import { MeProvider } from '@/providers/me-provider'
import { MessagingClientProvider } from '@/providers/messaging-client-provider'
import useApiService from '@/services/api-service'
import { User } from '@/types/user'
import { useContext, useEffect, useState } from 'react'
import Loading from '@/components/common/Loading'
import { Outlet, useNavigate } from 'react-router-dom'
import { NavigationContext } from '@/providers/navigation-provider'

export default function MainLayout() {

  const apiService = useApiService()

  const { fileInputOpen } = useContext(NavigationContext)
  const [me, setMe] = useState<User>()
  const navigate = useNavigate()

  useEffect(() => {
    const getMe = async () => {
      setMe(await apiService.getMe())
    }
    
    const handleVisibilityChange = () => {
      if (fileInputOpen?.current && document.visibilityState != 'hidden') {
        fileInputOpen.current = false
      } else if (document.visibilityState == 'visible') navigate(0)
    }    

    getMe()
    addEventListener("visibilitychange", handleVisibilityChange);
  }, [])

  return (
    <>
      {
        me ? (
        <MeProvider user={me}>
          <MessagingClientProvider>
          <div id="root-content">
            <AlertModal/>
            <div className='flex justify-center w-full'>
              <div className='max-md:grid-cols-10 max-xl:grid-cols-8 grid-cols-4 grid w-full max-w-[1850px]'>
                <div className='sm:sticky sm:top-5 h-fit flex items-start justify-end col-span-1 max-sm:fixed bottom-0 max-sm:z-20 max-sm:w-full'>
                  <LeftSideBar />
                </div>
                <div className="max-sm:col-span-10 max-md:col-span-8 max-xl:col-span-7 col-span-3 flex items-start sm:max-md:ml-1 md:ml-5">
                  <div className='md:w-[600px] max-w-[600px] flex w-full h-full md:mr-5'>
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
            <div className='h-40'></div>
            <ImageOverlay />
            <SubmitPostModal />
          </div>
          </MessagingClientProvider>
        </MeProvider>) : 
        <div className='flex justify-center items-center h-full w-full'>
          <Loading size={100} borderWidth={10}/>
        </div>
      }
    </>
  )
}
