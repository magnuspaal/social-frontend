import apiService from '@/lib/api-service'
import Navigation from './Navigation'

export default async function NavigationMenu() {

  const me = await apiService.getMe()

  return (
    <div className="flex flex-col">
      <Navigation me={me} />
    </div>
  )
}