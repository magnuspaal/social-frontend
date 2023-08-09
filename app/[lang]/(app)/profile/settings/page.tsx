import ProfileSettings from "@/components/profile/settings/ProfileSettings";
import { getDictionary } from "@/lang/lang";
import apiService from "@/services/api-service";

export default async function ProfileSettingsPage({ params }: any) {

  const user = await apiService.getMe()
  const dict = await getDictionary(params.lang)

  return (
    <div className="p-2 divide-black/40 border border-black/40 rounded max-w-2xl w-full">
      <ProfileSettings user={user} dict={dict}></ProfileSettings>
    </div>
  )
}