import UserPostList from "@/components/profile/UserPostList";

export default async function ProfileHome({ params }: any) {
  return (
    <div>
      <UserPostList userId={params.id}/>
    </div>
  )
}