import LeftSideBar from '@/components/left-side-bar/LeftSideBar'
import AlertModal from '@/components/modals/AlertModal'
import RightSideBar from '@/components/right-side-bar/RightSideBar'

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: any
}) {
  return (
    <div>
      <AlertModal />
      <div className='flex justify-center w-full'>
        <div className='max-md:grid-cols-6 max-xl:grid-cols-8 grid-cols-4 grid w-full max-w-[1850px]'>
          <div className='flex items-start justify-end col-span-1 max-sm:fixed bottom-0 z-40 max-sm:w-full'>
            <LeftSideBar params={params}/>
          </div>
          <div className="max-sm:col-span-6 max-md:col-span-5 max-xl:col-span-7 col-span-3 flex items-start sm:max-md:ml-1 md:ml-5">
            <div className='md:w-[600px] max-w-[600px] w-full md:mr-5'>
             {children}
            </div>
            <div className='max-md:hidden'>
              <RightSideBar/>
            </div>
          </div>

        </div>
      </div>
      
      <div className='h-40'></div>
    </div>
  )
}
