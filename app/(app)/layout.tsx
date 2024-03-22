import LeftSideBar from '@/components/left-side-bar/LeftSideBar'
import AlertModal from '@/components/modals/AlertModal'
import ImageOverlay from '@/components/modals/ImageOverlay'
import SubmitPostModal from '@/components/modals/SubmitPostModal'
import { MeProvider } from '@/services/me-provider'
import serverApiService from '@/services/server/server-api-service'

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: any
}) {

  const me = await serverApiService.getMe()

  return (
    <MeProvider user={me}>
      <div id="root-content">
        <AlertModal/>
        <div className='flex justify-center w-full'>
          <div className='max-md:grid-cols-6 max-xl:grid-cols-8 grid-cols-4 grid w-full max-w-[1850px]'>
            <div className='sm:sticky sm:top-5 h-fit flex items-start justify-end col-span-1 max-sm:fixed bottom-0 z-40 max-sm:w-full'>
              <LeftSideBar params={params}/>
            </div>
            <div className="max-sm:col-span-6 max-md:col-span-5 max-xl:col-span-7 col-span-3 flex items-start sm:max-md:ml-1 md:ml-5">
              <div className='md:w-[600px] max-w-[600px] flex w-full h-full md:mr-5'>
              {children}
              </div>
              <div className='max-md:hidden'>
                {/* <RightSideBar/> */}
              </div>
            </div>

          </div>
        </div>
        <div className='h-40'></div>
        <ImageOverlay />
        <SubmitPostModal />
      </div>
    </MeProvider>
  )
}
