'use client'

import authService from '@/lib/auth-service'
import { User } from '@/types/user'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function Navigation({me}: {me: User}) {

  const router = useRouter()
  const pathname = usePathname().substring(3)

  const isHome = () => pathname == '' || pathname == '/'
  const isMeProfile = () => pathname.startsWith(`/profile/${me.id}`)

  const logout = () => {
    authService.logout()
    router.push('/login') 
    router.refresh()
  }

  return (
    <div className="flex flex-col justify-start gap-4 grid">
      <Link href="/" className={`text-xl ${isHome() ? 'font-bold' : 'font-medium'}`}>Home</Link>
      <Link href={`/profile/${me.id}`} className={`text-xl mt-6 ${isMeProfile() ? 'font-bold' : 'font-medium'}`}>{me.username}</Link>
      <a onClick={logout} className='hover:cursor-pointer hover:underline'>Logout</a>
    </div>
  )
}