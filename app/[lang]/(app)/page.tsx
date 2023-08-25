import SubmitPost from "@/components/input/SubmitPost";
import Feed from "@/components/feed/Feed";
import { getDictionary } from "@/lang/lang";

export default async function Home({params}: any) {

  const dict = await getDictionary(params.lang)

  return (
    <div className="flex flex-col justify-center items-stretch">
      <SubmitPost dict={dict}/>
      <Feed dict={dict} />
    </div>
  )
}