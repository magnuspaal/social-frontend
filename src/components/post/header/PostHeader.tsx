

import { getPostTimestamp } from "@/utils/date-utils";
import { Post } from "@/types/post";
import { ImageSize, getImageAddress } from "@/utils/image-utils";
import useTranslation from "@/lang/use-translation";
import { useNavigate } from "react-router-dom";
import BlankProfileImageSvg from "@/components/svg/BlankProfileImageSvg";

export default function PostHeader({post, children, clickable = true}: {post: Post, children?: React.ReactNode, clickable?: boolean}) {

  const { t } = useTranslation()

  const navigate = useNavigate()

  const handleClick = (event: any) => {
    if (clickable) {
      event.preventDefault()
      navigate(`/profile/${post.user.id}`)
    }
  }

  return (
    <div className="flex flex-row p-4 items-start">
      <div className="mr-3">
        {
          post.user.imageName ?
          <img 
            src={getImageAddress(post.user.imageName, ImageSize.XS)}
            width={50}
            height={50}
          /> : <BlankProfileImageSvg size={50}/>
        }
      </div>
      <div>
        <div className="flex">
          <div onClick={handleClick} className={`font-bold text-lg mr-2 ${clickable && 'hover:underline hover:cursor-pointer'}`}>{post.user.username}</div>
          <div className="italic text-sm font-normal py-[4px]">{getPostTimestamp(post.createdAt, t('post.now'))}</div>
        </div>
        {children}
      </div>
    </div>
  )
}