import Profile from '@/components/profile/Profile'

export default async function ProfileLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: any
}) {
  return (
    <div className="divide-black/40 border border-black/40 rounded w-full">
      <div className="grid gap-3">
        <Profile userId={params.id}/>
        {children}
      </div>
    </div>
  )
}
