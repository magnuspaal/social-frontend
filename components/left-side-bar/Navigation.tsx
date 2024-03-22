'use client'

import clientAuthService from '@/services/client/client-auth-service'
import { User } from '@/types/user'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import useTranslation from '@/lang/use-translation'
import { useContext } from 'react'
import { MeContext } from '@/services/me-provider'

export default function Navigation() {

  const { t } = useTranslation()

  const router = useRouter()
  const pathname = usePathname()

  const { me, setMe } = useContext(MeContext)

  const isHome = () => pathname == '' || pathname == '/'
  const isSearch = () => pathname.startsWith(`/search`)
  const isMeProfile = () => pathname.startsWith(`/profile/${me?.id}`)
  const isChat = () => pathname.startsWith(`/chat`)
  const isProfileSettings = () => pathname.startsWith(`/profile/settings`)

  const logout = () => {
    clientAuthService.logout()
    if (setMe) {
      setMe(undefined);
    }
    router.push('/login') 
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-6 justify-start max-sm:flex-row max-sm:justify-around">
      <Link href="/" className={`text-xl flex ${isHome() ? 'font-bold' : 'font-medium'}`}>
        <Image src="/home.svg" alt="home" width={25} height={25} />
        <div className='max-xl:hidden ml-2'>{t('navigation.home')}</div>
      </Link>
      <Link href="/search" className={`text-xl flex ${isSearch() ? 'font-bold' : 'font-medium'}`}>
        <Image src="/search.svg" alt="home" width={25} height={25} />
        <div className='max-xl:hidden ml-2'>{t('navigation.search')}</div>
      </Link>
      <Link href={`/profile/${me?.id}`} className={`text-xl flex ${isMeProfile() ? 'font-bold' : 'font-medium'}`}>
        <Image src="/profile.svg" alt="profile" width={25} height={25} />
        <div className='max-xl:hidden ml-2'>{`${me?.username}`}</div>
      </Link>
      <Link href={`/chat`} className={`text-xl flex ${isChat() ? 'font-bold' : 'font-medium'}`}>
        <Image src="/chat.svg" alt="profile" width={25} height={25} />
        <div className='max-xl:hidden ml-2'>{t('navigation.chat')}</div>
      </Link>
      <Link href={`/profile/settings`} className={`text-xl flex ${isProfileSettings() ? 'font-bold' : 'font-medium'}`}>
        <Image src="/settings.svg" alt="settings" width={25} height={25} />
        <div className='max-xl:hidden ml-2'>{t('navigation.profile')}</div>
      </Link>
      <a onClick={logout} className='text-xl flex font-medium cursor-pointer'>
        <Image src="/logout.svg" alt="logout" width={25} height={25} />
        <div className='max-xl:hidden ml-2'>{t('navigation.logout')}</div>
      </a>
    </div>
  )
}