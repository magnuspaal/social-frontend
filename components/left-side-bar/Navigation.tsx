'use client'

import authService from '@/services/auth-service'
import { User } from '@/types/user'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Navigation({me, dict}: {me: User, dict: any}) {

  const router = useRouter()
  const pathname = usePathname().substring(3)

  const isHome = () => pathname == '' || pathname == '/'
  const isSearch = () => pathname.startsWith(`/search`)
  const isMeProfile = () => pathname.startsWith(`/profile/${me.id}`)
  const isProfileSettings = () => pathname.startsWith(`/profile/settings`)
  const isMessaging = () => pathname.startsWith(`/messaging`)

  const logout = () => {
    authService.logout()
    router.push('/login') 
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-6 justify-start max-sm:flex-row max-sm:justify-around">
      <Link href="/" className={`text-xl flex ${isHome() ? 'font-bold' : 'font-medium'}`}>
        <Image src="/home.svg" alt="home" width={25} height={25} />
        <div className='max-xl:hidden ml-2'>{dict.navigation.home}</div>
      </Link>
      <Link href="/search" className={`text-xl flex ${isSearch() ? 'font-bold' : 'font-medium'}`}>
        <Image src="/search.svg" alt="home" width={25} height={25} />
        <div className='max-xl:hidden ml-2'>{dict.navigation.search}</div>
      </Link>
      <Link href={`/profile/${me.id}`} className={`text-xl flex ${isMeProfile() ? 'font-bold' : 'font-medium'}`}>
        <Image src="/profile.svg" alt="profile" width={25} height={25} />
        <div className='max-xl:hidden ml-2'>{me.username}</div>
      </Link>
      <Link href={`/chat`} className={`text-xl flex ${isMessaging() ? 'font-bold' : 'font-medium'}`}>
        <Image src="/chat.svg" alt="profile" width={25} height={25} />
        <div className='max-xl:hidden ml-2'>{dict.navigation.chat}</div>
      </Link>
      <Link href={`/profile/settings`} className={`text-xl flex ${isProfileSettings() ? 'font-bold' : 'font-medium'}`}>
        <Image src="/settings.svg" alt="settings" width={25} height={25} />
        <div className='max-xl:hidden ml-2'>{dict.navigation.profile}</div>
      </Link>
      <a onClick={logout} className='text-xl flex font-medium cursor-pointer'>
        <Image src="/logout.svg" alt="logout" width={25} height={25} />
        <div className='max-xl:hidden ml-2'>Logout</div>
      </a>
    </div>
  )
}