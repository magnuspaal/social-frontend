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
        <div className='max-2xl:grid-cols-4 grid-cols-3 grid w-full max-w-[1850px]'>
          <div className='max-md:hidden flex items-start justify-end ml-5 col-span-1'>
            <LeftSideBar params={params}/>
          </div>
          <div className="max-md:col-span-4 max-lg:col-span-3 max-2xl:col-span-2 col-span-1 md:ml-5 md:mr-5 flex items-start">
            {children}
          </div>
          <div className='max-lg:hidden col-span-1 mr-5'>
            <RightSideBar/>
          </div>
        </div>
      </div>
      
      <div className='h-40'></div>
    </div>
  )
}
