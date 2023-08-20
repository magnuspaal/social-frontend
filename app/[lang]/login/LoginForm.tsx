'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import authService from '@/services/auth-service';

export default function LoginForm({dict}: any) {

  const router = useRouter()
  const searchParams = useSearchParams()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorCodes, setErrorCodes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [registeredMessage, setRegisteredMessage] = useState<boolean>(!!searchParams.get("registered"))

  const submit = async(event: any) => {
    event.preventDefault()
    setLoading(true)
    setRegisteredMessage(false)
    await authService.postLogin(email, password)
      .then(() => router.push('/'))
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
        <div className='border rounded border-green-400 p-4 bg-green-200 text-gray-800'>Verification sent to email</div>
      }
      <input
        className="p-2 rounded border border-solid"
        type="text"
        placeholder={dict.login['email']}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoCapitalize='none'
        disabled={loading}
      />
      <input
        className="p-2 rounded border border-solid"
        type="password"
        placeholder={dict.login['password']}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoCapitalize='none'
        disabled={loading}
      />
      <div>{
        errorCodes.map((code, index) => <p className='m-y-1.5 text-red-600 italic text-center' key={code + index}>{dict.login.messages[code] ?? dict.login.messages['default']}</p>)
      }</div>

      <button className='p-2 rounded bg-secondary font-sans font-bold' type='submit' disabled={loading}>
        {
          loading 
          ? 
          <span className="loader w-8 h-8"></span>
          :
          <div>{dict.login.login}</div>
        }
      </button>
    <button onClick={handleSignup} className='rounded border border-black/40 p-2' type='button' disabled={loading}>
      {dict.login.signup}
      </button>
    </form>
  )
}