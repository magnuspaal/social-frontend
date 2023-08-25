'use client'

import { User } from "@/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Profile({ dict, user }: {dict: any, user: User}) {

  const pathname = usePathname().substring(3)

  const pathPosts = () => pathname == `/profile/${user.id}`
  const pathFollowing = () => pathname == `/profile/${user.id}/following`
  const pathFollowers = () => pathname == `/profile/${user.id}/followers`

  return (
    <div className="flex mt-4 gap-6 justify-items-center">
      <Link href={`/profile/${user.id}`} className={`hover:cursor-pointer text-center w-fit ${pathPosts() && 'font-bold border-b-4 border-secondary rounded'}`}>
        {dict.profile.posts}
      </Link>
      <Link href={`/profile/${user.id}/followers`} className={`hover:cursor-pointer text-center w-fit ${pathFollowers() && 'font-bold border-b-4 border-secondary rounded'}`}>
        {user.followerCount} {dict.profile.followers}
      </Link>
      <Link href={`/profile/${user.id}/following`} className={`hover:cursor-pointer text-center w-fit ${pathFollowing() && 'font-bold border-b-4 border-secondary rounded'}`}>
        {user.followingCount} {dict.profile.following}
      </Link>
    </div>
  )
}