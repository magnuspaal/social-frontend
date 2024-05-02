

import Loading from "@/components/common/Loading";
import UserPostList from "@/components/profile/UserPostList";
import { useParams } from "react-router-dom";

export default function ProfileHome() {

  const params = useParams()

  return (
    <div>
      { params.id ? <UserPostList userId={parseInt(params.id)}/> : 
        <div className='flex justify-center items-center h-full w-full'>
          <Loading size={75} borderWidth={8}/>
        </div> 
      }
    </div>
  )
}