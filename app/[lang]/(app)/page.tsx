import SubmitPost from "@/components/input/SubmitPost";
import Feed from "@/components/feed/Feed";
import { getDictionary } from "@/lang/lang";
import apiService from "@/services/api-service";

export default async function Home({params}: any) {

  const dict = await getDictionary(params.lang)
  const me = await apiService.getMe();

  return (
    <div className="flex flex-col justify-center items-stretch w-full">
      <SubmitPost dict={dict} me={me}/>
      <Feed dict={dict} />
    </div>
  )
}