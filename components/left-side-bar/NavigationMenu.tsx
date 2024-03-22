import apiService from '@/services/server/server-api-service'
import Navigation from './Navigation'

export default async function NavigationMenu({params}: any) {

  const me = await apiService.getMe()

  return (
    <div className="flex flex-col">
      <Navigation me={me}/>
    </div>
  )
}