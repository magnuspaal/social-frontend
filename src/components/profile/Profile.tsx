

import FollowButton from "@/components/common/FollowButton";
import ProfileActions from "./ProfileActions";
import SendMessageButton from "./SendMessageButton";
import { getProfileAge } from "@/utils/date-utils";
import { useContext } from "react";
import { MeContext } from "@/providers/me-provider";
import useTranslation from "@/lang/use-translation";
import { User } from "@/types/user";
import { ImageSize, getImageAddress } from "@/utils/image-utils";
import BlankProfileImageSvg from "../svg/BlankProfileImageSvg";

export default function Profile({ user }: {user: User}) {

  const { me } = useContext(MeContext)
  const { t } = useTranslation()
  const isMe = () => me?.id == user?.id

  return (
    <div className="m-2">
      <div className="ml-4">
        <div className="flex items-center mt-4 flex-wrap">
          <div className="mr-3">
            {
              user?.imageName ? <img
                src={getImageAddress(user.imageName, ImageSize.XS)}  
                alt="Profile picture"
                height={75}
                width={75}
                
              /> : <BlankProfileImageSvg size={75} />
            }
          </div>
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