import SubmitPost from '@/components/input/SubmitPost'
import Feed from '@/components/feed/Feed'
import { ProtectedRoute } from '@/ProtectedRoute'

export default function HomePage() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col justify-start items-stretch w-full">
        <SubmitPost/>
        <Feed />
      </div>
    </ProtectedRoute>
  )
}
