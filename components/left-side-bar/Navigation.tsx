'use client'

import authService from '@/services/auth-service'
import { User } from '@/types/user'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function Navigation({me, dict}: {me: User, dict: any}) {

  const router = useRouter()
  const pathname = usePathname().substring(3)

  const isHome = () => pathname == '' || pathname == '/'
  const isMeProfile = () => pathname.startsWith(`/profile/${me.id}`)
  const isProfileSettings = () => pathname.startsWith(`/profile/settings`)

  const logout = () => {
    authService.logout()
    router.push('/login') 
    router.refresh()
  }

  return (
    <div className="flex flex-col justify-start gap-4 grid">
      <Link href="/" className={`text-xl ${isHome() ? 'font-bold' : 'font-medium'}`}>{dict.navigation.home}</Link>
      <Link href={`/profile/${me.id}`} className={`text-xl mt-6 ${isMeProfile() ? 'font-bold' : 'font-medium'}`}>{me.username}</Link>
      <Link href={`/profile/settings`} className={`hover:cursor-pointer hover:underline ${isProfileSettings() ? 'underline' : ''}`}>{dict.navigation.profile}</Link>
      <a onClick={logout} className='hover:cursor-pointer hover:underline'>Logout</a>
    </div>
  )
}