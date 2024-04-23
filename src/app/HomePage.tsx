import SubmitPost from '@/components/input/SubmitPost'
import Feed from '@/components/feed/Feed'

export default function HomePage() {
  return (
    <div className="flex flex-col justify-start items-stretch w-full">
      <SubmitPost/>
      <Feed />
    </div>
  )
}
