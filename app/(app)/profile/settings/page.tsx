import ProfileSettings from "@/components/profile/settings/ProfileSettings";
import apiService from "@/services/server/server-api-service";

export default async function ProfileSettingsPage() {

  const user = await apiService.getMe()

  return (
    <div className="p-2 divide-black/40 border border-black/40 rounded w-full">
      <ProfileSettings user={user}></ProfileSettings>
    </div>
  )
}