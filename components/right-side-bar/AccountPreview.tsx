import { User } from "@/types/user"
import FollowButton from "../common/FollowButton"
import Link from "next/link"

export default function AccountsPreview({account}: {account: User}) {

  return (
    <Link href={`/profile/${account.id}`} className="pt-4">
      <div className="font-bold mb-2">{account.username}</div>
      <FollowButton account={account}/>
    </Link>
  )
}