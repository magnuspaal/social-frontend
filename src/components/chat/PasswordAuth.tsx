import useTranslation from '@/lang/use-translation';
import useClientMessagingApiService from '@/services/messaging-service';
import { MeContext } from '@/providers/me-provider';
import { useContext, useState } from 'react';
import useAuthService from '@/services/auth-service';

export default function PasswordAuth() {

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorCodes, setErrorCodes] = useState<string[]>([])

  const messagingService = useClientMessagingApiService()

  const { t } = useTranslation()
  const { me } = useContext(MeContext)

  const authService = useAuthService()

  const submit = async(event: any) => {
    event.preventDefault()
    setLoading(true)
    authService.postLogin(me?.email ?? "", password)
      .then(() => messagingService.getUserEncryption(password)
          // .then(() => router.push(`/chat/${chatId}`))
          .finally(() => setLoading(false)))
      .catch((codes: string[]) => {
        if (codes) {
          setErrorCodes(codes)
        } else {
          setErrorCodes(["login.messages.default"])
        }
      })
      .finally(() => setLoading(false))
  }

  return(
    <div className="flex flex-col items-center">
      <h1 className='text-xl font-bold mt-10'>{t('chat.reauthenticate')}</h1>
      <p className='text-sm mb-5'>{t(`chat.reauthenticate_sub`)}</p>
      <form onSubmit={submit} className="flex flex-col grid gap-2 min-w-[300px] max-w-[300px] w-full">
        <input
          className="p-2 rounded border border-solid"
          type="password"
          autoComplete='current-password'
          placeholder={t('login.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoCapitalize='none'
          disabled={loading}
        />
        <div>{
          errorCodes.map((code, index) => <p className='m-y-1.5 text-red-600 italic text-center' key={code + index}>{t(`login.messages.${code}`) ?? t('login.messages.default')}</p>)
        }</div>
        <button className='p-4 rounded bg-secondary font-bold' type='submit' disabled={loading}>
          {
            loading
            ? 
            <div className='h-[40px] flex justify-center items-center'>
              <span className="loader h-full w-10 h-10"></span>
            </div>
            :
            <div  className='h-[40px] flex justify-center items-center'>{t('login.login')}</div>
          }
        </button>
      </form>
    </div>
  )
}