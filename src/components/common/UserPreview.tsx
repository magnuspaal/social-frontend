import { User } from "@/types/user"
import FollowButton from "./FollowButton"
import { Link } from "react-router-dom"

export default function UserPreview({user}: {user: User}) {

  return (
    <Link to={`/profile/${user.id}`} className="flex flex-row items-center flex-wrap justify-center">
      <div className="flex flex-column grow">
        <div className="min-w-[150px]">
          <div className="font-bold mb-2 max-sm:truncate">{user.username}</div>
          <div className="font-light">
            <span className="font-bold">{user.followerCount}</span> Followers
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4 mb-2">
        <FollowButton user={user} />
      </div>
    </Link>
  )
}