import Profile from '@/components/profile/Profile'

export default function ProfileLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: any
}) {
  return (
    <div className="divide-black/40 border border-black/40 rounded max-w-2xl w-full">
      <div className="grid gap-3 max-w-2xl w-full">
        <Profile userId={params.id}/>
        {children}
      </div>
    </div>
  )
}
