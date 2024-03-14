import Profile from '@/components/profile/Profile'
import { getDictionary } from '@/lang/lang'

export default async function ProfileLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: any
}) {

  const dict = await getDictionary(params.lang)

  return (
    <div className="divide-black/40 border border-black/40 rounded w-full">
      <div className="grid gap-3">
        <Profile dict={dict} userId={params.id}/>
        {children}
      </div>
    </div>
  )
}
