import SubmitPost from "@/components/input/SubmitPost";
import Feed from "@/components/feed/Feed";

export default function Home() {

  return (
    <div className="flex flex-col justify-center items-stretch">
      <SubmitPost/>
      <Feed />
    </div>
  )
}