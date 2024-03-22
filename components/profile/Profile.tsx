import serverApiService from "@/services/server/server-api-service";
import FollowButton from "@/components/common/FollowButton";
import ProfileActions from "./ProfileActions";
import Image from "next/image";
import { ImageSize, getImageAddress } from "@/utils/image-utils";
import SendMessageButton from "./SendMessageButton";
import t from "@/lang/server-translation";
import { getProfileAge } from "@/utils/date-utils";

export default async function Profile({ userId }: {userId: number}) {

  const user = await serverApiService.getUser(userId)
  
  const me = await serverApiService.getMe()
  const isMe = () => me.id == user.id

  return (
    <div className="m-2">
      <div className="ml-4">
        <div className="flex items-center mt-4 flex-wrap">
          <Image 
            src={user?.imageName ? getImageAddress(user.imageName, ImageSize.XS) : "/blank-profile-picture.svg"}  
            alt="Profile picture"
            height={75}
            width={75}
            quality={100}
            className="mr-3"
          />
          <div className="mb-4">
            <div className="text-3xl font-bold mb-1">{user.username}</div>
            <div>
              {t('profile.member_for')} {getProfileAge(user.createdAt, t('profile.time'))}
            </div>
          </div>
          <div className="flex justify-center grow mx-6 mb-2 mt-4">
            {!isMe() && <FollowButton user={user} className='text-lg max-w-[150px] min-w-[120px]' />}
            {!isMe() && <SendMessageButton user={user} className='ml-2'/>}
          </div>

        </div>
        <ProfileActions user={user} />
      </div>
    </div>
  )
}