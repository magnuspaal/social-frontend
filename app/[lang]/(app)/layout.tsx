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
      <div className='h-20'>
      </div>
      <div className='flex justify-center w-full'>
        <div className='grid grid-cols-3 w-full max-w-[2000px]'>
          <div className='max-md:hidden flex flex-col items-end'>
            <LeftSideBar params={params}/>
          </div>
          <div className="max-xl:col-span-2 max-md:col-span-3">
            {children}
          </div>
          <div className='max-xl:hidden'>
            <RightSideBar/>
          </div>
        </div>
      </div>
      
      <div className='h-40'></div>
    </div>
  )
}
