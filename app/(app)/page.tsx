import SubmitPost from "@/components/input/SubmitPost";
import Feed from "@/components/feed/Feed";
import apiService from "@/services/server/server-api-service";

export default async function Home({params}: any) {

  const me = await apiService.getMe();

  return (
    <div className="flex flex-col justify-start items-stretch w-full">
      <SubmitPost me={me}/>
      <Feed />
    </div>
  )
}