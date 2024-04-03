'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import clientAuthService from '@/services/client/client-auth-service';
import useTranslation from '@/lang/use-translation';

export default function RegisterForm() {

  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [errorCodes, setErrorCodes] = useState([])

  const router = useRouter()
  const { t } = useTranslation()

  const submit = async(event: any) => {
    event.preventDefault()
    setLoading(true)

    await clientAuthService.postRegister(email, password, firstName, lastName, username)
      .then(() => {
        router.push("/login?registered=true")
        setErrorCodes([])
      })
      .catch((codes) => { setErrorCodes(codes)})
      .finally(() => {
        setLoading(false)
      })
  }

  const getErrorsFor = (code: string) => errorCodes.flatMap((error: string) => { 
    if (error.includes(code)) return error
    else return []
  })

  const renderErrorMessageFor = (code: string) => {
    return (
      <div>{
        getErrorsFor(code).map((code, index) => 
          <p className='m-y-1.5 text-red-600 italic text-center text-sm' key={index}>
            {t(`register.messages.${code}`) ?? t(`register.messages.default`)}
          </p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col grid gap-5 min-w-[300px] max-w-[300px] w-full">

      <div className='flex flex-col'>
        <label htmlFor="username" className='font-semibold text-md'>{t('register.username')}</label>
        <input 
          className={`p-2 rounded border border-black border-solid ${getErrorsFor('username').length && 'border-2 border-rose-500'}`} 
          type="text" id="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          autoCapitalize='none'
          disabled={loading}
        />
        {renderErrorMessageFor('username')}
      </div>

      <div className='flex flex-col'>
        <label htmlFor="email" className='font-semibold text-md'>{t('register.email')}</label>
        <input 
          className={`p-2 rounded border border-black  border-solid ${getErrorsFor('email').length && 'border-2 border-rose-500'}`} 
          type="text" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          autoCapitalize='none'
          disabled={loading}
        />
        {renderErrorMessageFor('email')}
      </div>

      <div className='flex flex-col'>
        <label htmlFor="password" className='font-semibold text-md'>{t('register.password')}</label>
        <input className={`p-2 rounded border border-black  border-solid ${getErrorsFor('password').length && 'border-2 border-rose-500'}`} autoComplete='new-password' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoCapitalize='none' disabled={loading}/>
        {renderErrorMessageFor('password')}
      </div>

      <div className='flex flex-col'>
        <label htmlFor="first-name" className='font-semibold text-md'>{t('register.firstname')}</label>
        <input className={`p-2 rounded border border-black border-solid ${getErrorsFor('firstname').length  && 'border-2 border-rose-500'}`} autoComplete='new-password' type="text" id='first-name' value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={loading}/>
        {renderErrorMessageFor('firstname')}
      </div>


      <div className='flex flex-col'>
        <label htmlFor="last-name" className='font-semibold text-md'>{t('register.lastname')}</label>
        <input className={`p-2 rounded border border-black border-solid ${getErrorsFor('lastname').length  && 'border-2 border-rose-500'}`} type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={loading}/>
        {renderErrorMessageFor('lastname')}
      </div>
      
      <button className='p-2 rounded bg-secondary font-sans font-bold' type='submit' disabled={loading}>
        {
          loading 
          ? 
          <span className="loader w-8 h-8"></span>
          :
          <div>{t('register.signup')}</div>
        }
      </button>
    </form>
  )
}