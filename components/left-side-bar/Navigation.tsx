'use client'

import { User } from '@/types/user'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation({me}: {me: User}) {

  const pathname = usePathname()

  const isHome = () => pathname == '/'

  const isMeProfile = () => pathname.startsWith(`/profile/${me.id}`)

  return (
    <div className="flex flex-col justify-start gap-4 grid">
      <Link href="/" className={`text-xl ${isHome() ? 'font-bold' : 'font-medium'}`}>Home</Link>
      <Link href={`/profile/${me.id}`} className={`text-xl mt-6 ${isMeProfile() ? 'font-bold' : 'font-medium'}`}>{me.username}</Link>
    </div>
  )
}