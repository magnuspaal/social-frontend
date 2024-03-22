'use client'

import useTranslation from "@/lang/use-translation";
import { User } from "@/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Profile({ user }: {user: User}) {

  const { t } = useTranslation()
  const pathname = usePathname()

  const pathPosts = () => pathname == `/profile/${user.id}`
  const pathFollowing = () => pathname == `/profile/${user.id}/following`
  const pathFollowers = () => pathname == `/profile/${user.id}/followers`

  return (
    <div className="flex mt-4 gap-6 justify-items-center">
      <Link href={`/profile/${user.id}`} className={`hover:cursor-pointer text-center w-fit ${pathPosts() && 'font-bold border-b-4 border-secondary rounded'}`}>
        {t('profile.posts')}
      </Link>
      <Link href={`/profile/${user.id}/followers`} className={`hover:cursor-pointer text-center w-fit ${pathFollowers() && 'font-bold border-b-4 border-secondary rounded'}`}>
        {user.followerCount} {t('profile.followers')}
      </Link>
      <Link href={`/profile/${user.id}/following`} className={`hover:cursor-pointer text-center w-fit ${pathFollowing() && 'font-bold border-b-4 border-secondary rounded'}`}>
        {user.followingCount} {t('profile.following')}
      </Link>
    </div>
  )
}