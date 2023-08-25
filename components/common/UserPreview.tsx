import { User } from "@/types/user"
import FollowButton from "./FollowButton"
import Link from "next/link"
import Image from 'next/image'
import { ImageSize, getImageAddress } from "@/utils/image-utils"

export default function UserPreview({dict, user}: {dict: any, user: User}) {

  return (
    <Link href={`/profile/${user.id}`} className="flex flex-row items-center flex-wrap justify-center">
      <div className="flex flex-column grow">
        <Image 
          src={user.imageName ? getImageAddress(user.imageName, ImageSize.XS) : "/blank-profile-picture.svg"} 
          height={60}
          width={60}
          quality={100}
          alt={`Image of ${user.username}`}
          className="mr-3"
        />
        <div className="min-w-[150px]">
          <div className="font-bold mb-2 max-sm:truncate">{user.username}</div>
          <div className="font-light">
            <span className="font-bold">{user.followerCount}</span> Followers
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4 mb-2">
        <FollowButton dict={dict} user={user} />
      </div>
    </Link>
  )
}