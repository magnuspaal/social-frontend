'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import clientAuthService from '@/services/client/client-auth-service';
import useTranslation from '@/lang/use-translation';
import useClientMessagingService from '@/services/client/client-messaging-service';

export default function LoginForm() {

  const router = useRouter()
  const searchParams = useSearchParams()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorCodes, setErrorCodes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [registeredMessage, setRegisteredMessage] = useState<boolean>(!!searchParams.get("registered"))

  const clientMessagingService = useClientMessagingService()
  
  const { t } = useTranslation()

  const submit = async(event: any) => {
    event.preventDefault()
    setLoading(true)
    setRegisteredMessage(false)
    await clientAuthService.postLogin(email, password)
      .then(async () => {
        await clientMessagingService.getUserEncryption(password)
          .then(() => router.push('/'))
      })
      .catch((codes: string[]) => {
        if (codes) {
          setErrorCodes(codes)
        } else {
          setErrorCodes(["login.messages.default"])
        }
      })
      .finally(() => setLoading(false))
  }

  const handleSignup = async () => {
    router.push('/register')
  }

  return (
    <form onSubmit={submit} className="flex flex-col grid gap-5 min-w-[300px] max-w-[300px] w-full">
      {
        registeredMessage &&
        <div className='border rounded border-green-400 p-4 bg-green-200 text-green-800'>{t('login.verification_sent')}</div>
      }
      <input
        className="p-2 rounded border border-solid"
        type="text"
        placeholder={t('login.email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoCapitalize='none'
        disabled={loading}
      />
      <input
        className="p-2 rounded border border-solid"
        type="password"
        placeholder={t('login.password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoCapitalize='none'
        disabled={loading}
      />
      <div>{
        errorCodes.map((code, index) => <p className='m-y-1.5 text-red-600 italic text-center' key={code + index}>{t(`login.messages.${code}`) ?? t(`login.messages.default`)}</p>)
      }</div>

      <button className='p-4 rounded bg-secondary font-sans font-bold' type='submit' disabled={loading}>
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
      <button onClick={handleSignup} className='rounded border border-black/40 p-2' type='button' disabled={loading}>
        {t('login.signup')}
      </button>
    </form>
  )
}