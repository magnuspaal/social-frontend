import useTranslation from '@/lang/use-translation'
import { useContext } from 'react'
import { MeContext } from '@/providers/me-provider'
import { useAppDispatch } from '@/store/hooks'
import { clearAllMessages } from '@/store/messaging-slice'
import { Link, useLocation } from 'react-router-dom'
import HomeSvg from '../svg/HomeSvg'
import SearchSvg from '../svg/SearchSvg'
import ProfileSvg from '../svg/ProfileSvg'
import ChatSvg from '../svg/ChatSvg'
import SettingsSvg from '../svg/SettingsSvg'
import LogoutSvg from '../svg/LogoutSvg'
import { AuthContext } from '@/providers/auth-provider'

export default function Navigation() {

  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const location = useLocation()

  const { me } = useContext(MeContext)
  const { logout } = useContext(AuthContext);

  const isHome = () => location.pathname == '' || location.pathname == '/'
  const isSearch = () => location.pathname.startsWith(`/search`)
  const isMeProfile = () => location.pathname.startsWith(`/profile/${me?.id}`)
  const isChat = () => location.pathname.startsWith(`/chat`)
  const isProfileSettings = () => location.pathname.startsWith(`/profile/settings`)

  const logoutSubmit = () => {
    dispatch(clearAllMessages())
    logout()
  }

  return (
    <div className="flex flex-col gap-6 justify-start max-sm:flex-row max-sm:justify-around">
      <Link to="/" className={`text-xl flex ${isHome() ? 'font-bold' : 'font-medium'}`}>
        <HomeSvg />
        <div className='max-xl:hidden ml-2'>{t('navigation.home')}</div>
      </Link>
      <Link to="/search" className={`text-xl flex ${isSearch() ? 'font-bold' : 'font-medium'}`}>
        <SearchSvg />
        <div className='max-xl:hidden ml-2'>{t('navigation.search')}</div>
      </Link>
      <Link to={`/profile/${me?.id}`} className={`text-xl flex ${isMeProfile() ? 'font-bold' : 'font-medium'}`}>
        <ProfileSvg />
        <div className='max-xl:hidden ml-2'>{`${me?.username}`}</div>
      </Link>
      <Link to="/chat" className={`text-xl flex ${isChat() ? 'font-bold' : 'font-medium'}`}>
        <ChatSvg />
        <div className='max-xl:hidden ml-2'>{t('navigation.chat')}</div>
      </Link>
      <Link to="/profile/settings" className={`text-xl flex ${isProfileSettings() ? 'font-bold' : 'font-medium'}`}>
        <SettingsSvg />
        <div className='max-xl:hidden ml-2'>{t('navigation.profile')}</div>
      </Link>
      <a onClick={logoutSubmit} className='text-xl flex font-medium cursor-pointer'>
        <LogoutSvg />
        <div className='max-xl:hidden ml-2'>{t('navigation.logout')}</div>
      </a>
    </div>
  )
}