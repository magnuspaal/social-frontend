import { User } from "@/types/user"
import FollowButton from "../common/FollowButton"
import Link from "next/link"
import Image from 'next/image'
import { getImageAddress } from "@/utils/image-utils"

export default function AccountsPreview({account}: {account: User}) {

  return (
    <Link href={`/profile/${account.id}`} className="pt-4 flex flex-row items-center">
      <Image 
        src={account.imageName ? getImageAddress(account.imageName) : "/blank-profile-picture.svg"} 
        height={60}
        width={60}
        alt={`Image of ${account.username}`}
        className="mr-3"
      />
      <div>
        <div className="font-bold mb-2">{account.username}</div>
        <FollowButton account={account}/>
      </div>
    </Link>
  )
}