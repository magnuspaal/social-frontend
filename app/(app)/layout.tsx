import LeftSideBar from '@/components/left-side-bar/LeftSideBar'
import RightSideBar from '@/components/right-side-bar/RightSideBar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className='h-40'></div>
      <div className='flex justify-center w-full'>
        <div className='grid grid-cols-3 w-full max-w-[2000px]'>
          <div className='max-md:hidden flex flex-col items-end'>
            <LeftSideBar/>
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
