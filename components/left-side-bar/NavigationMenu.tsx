import apiService from '@/services/api-service'
import Navigation from './Navigation'
import { getDictionary } from '@/lang/lang'

export default async function NavigationMenu({params}: any) {

  const me = await apiService.getMe()
  const dict = await getDictionary(params.lang)

  return (
    <div className="flex flex-col">
      <Navigation me={me} dict={dict}/>
    </div>
  )
}