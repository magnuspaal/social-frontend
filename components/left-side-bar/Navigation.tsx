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
  const isMeProfile = () => pathname.startsWith(`/profile/${me.id}`)
  const isProfileSettings = () => pathname.startsWith(`/profile/settings`)

  const logout = () => {
    authService.logout()
    router.push('/login') 
    router.refresh()
  }

  return (
    <div className="flex flex-col justify-start gap-4 grid">
      <Link href="/" className={`text-xl flex ${isHome() ? 'font-bold' : 'font-medium'}`}>
        <Image src="home.svg" alt="Logout logo" width={20} height={20} />
        <div className='max-xl:hidden ml-1'>{dict.navigation.home}</div>
      </Link>
      <Link href={`/profile/${me.id}`} className={`text-xl mt-6 flex ${isMeProfile() ? 'font-bold' : 'font-medium'}`}>
        <Image src="profile.svg" alt="Profile logo" width={20} height={20} />
        <div className='max-xl:hidden ml-1'>{me.username}</div>
      </Link>
      <Link href={`/profile/settings`} className={`hover:cursor-pointer hover:underline flex ${isProfileSettings() ? 'underline' : ''}`}>
        <Image src="settings.svg" alt="Settings logo" width={20} height={20} />
        <div className='max-xl:hidden ml-1'>{dict.navigation.profile}</div>
      </Link>
      <a onClick={logout} className='hover:cursor-pointer hover:underline flex'>
        <Image src="logout.svg" alt="Logout logo" width={20} height={20} />
        <div className='max-xl:hidden ml-1'>Logout</div>
      </a>
    </div>
  )
}