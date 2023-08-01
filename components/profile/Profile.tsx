import apiService from "@/lib/api-service";
import { getProfileAge } from "@/utils/date-utils";
import FollowButton from "@/components/common/FollowButton";
import ProfileActions from "./ProfileActions";
import Image from "next/image";

export default async function Profile({ userId }: {userId: number}) {

  const imageApiUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL
  const user = await apiService.getUser(userId)
  
  const profile = await apiService.getMe()
  const isMe = () => profile.id == user.id

  return (
    <div>
      <div className="ml-4">
        <div className="flex items-center mt-4">
          <Image 
              src={user.imageName ? `${imageApiUrl}/${user.imageName}` : `/blank-profile-picture.png`} 
              alt="Profile picture"
              height={75}
              width={75}
              className="mr-3"
            />
          <div className="mb-4 w-full">
            <div className="text-3xl font-bold mb-1">{user.username}</div>
            <div>Member for {getProfileAge(user.createdAt)}</div>
          </div>
          <div className="w-full flex justify-center">
            {!isMe() && <FollowButton account={user} size='text-lg' width='w-32' />}
          </div>

        </div>

        <ProfileActions user={user} />
      </div>
    </div>
  )
}