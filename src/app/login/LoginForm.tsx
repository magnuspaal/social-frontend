import { FormEventHandler, useContext, useState } from 'react'
import useAuthService from '@/services/auth-service';
import useTranslation from '@/lang/use-translation';
import useMessagingService from '@/services/messaging-service';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/providers/auth-provider';

export default function LoginForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [errorCodes, setErrorCodes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [registeredMessage, setRegisteredMessage] = useState<boolean>(false)

  const messagingService = useMessagingService()
  const authService = useAuthService()
  
  const { t } = useTranslation()

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit: FormEventHandler<HTMLFormElement> = async(event) => {
    event.preventDefault()
    event.stopPropagation()
    setLoading(true)
    setRegisteredMessage(false)
    authService.postLogin(email, password)
      .then(async () => {
        login(true)
        await messagingService.getUserEncryption(password)
        setLoading(false)
        navigate("/", { replace: true })
      })
      .catch((codes: any) => {
        console.error(codes)
        // if (codes) {
        //   setErrorCodes(codes)
        // } else {
        //   setErrorCodes(["login.messages.default"])
        // }
        setLoading(false)
      })
  }

  const handleSignup = async () => {
    navigate('/register')
  }

  return (
    <form onSubmit={submit} className="flex flex-col grid gap-5 min-w-[300px] max-w-[300px] w-full">
      {
        registeredMessage &&
        <div className='border rounded border-green-400 p-4 bg-green-200 text-green-800'>
          {t('login.verification_sent')}
        </div>
      }
      <input
        className="p-2 rounded border border-solid"
        type="text"
        placeholder={t('login.email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoCapitalize='none'
        disabled={loading}
        autoComplete='email'
        name='email'
      />
      <input
        className="p-2 rounded border border-solid"
        type="password"
        placeholder={t('login.password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoCapitalize='none'
        disabled={loading}
        autoComplete='current-password'
        name='password'
      />
      <div>{
        // errorCodes.map((code, index) => <p className='m-y-1.5 text-red-600 italic text-center' key={code + index}>
        //   {t(`login.messages.${code}`) ?? t(`login.messages.default`)}
        // </p>)
      }</div>
      <button className='p-4 rounded bg-secondary font-bold' type='submit' disabled={loading}>
        {
          loading
          ? 
          <div className='h-[40px] flex justify-center items-center'>
            <span className="loader h-full w-10 h-10"></span>
          </div>
          :
          <div  className='h-[40px] flex justify-center items-center'>
            {t('login.login')}
          </div>
        }
      </button>
      <button onClick={handleSignup} className='rounded border border-black/40 p-2' type='button' disabled={loading}>
        {t('login.signup')}
      </button>
    </form>
  )
}