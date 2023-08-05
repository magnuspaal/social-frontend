import Profile from '@/components/profile/Profile'

export default function ProfileLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: any
}) {
  return (
    <div className=" p-2 divide-black/40 border border-black/40 rounded">
      <div className="grid gap-3">
        <Profile userId={params.id}/>
        {children}
      </div>
    </div>
  )
}
