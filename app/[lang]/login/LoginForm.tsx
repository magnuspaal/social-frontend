'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import authService from '@/services/auth-service';

export default function LoginForm({dict}: any) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorCodes, setErrorCodes] = useState<string[]>([])

  const router = useRouter()

  const submit = async(event: any) => {
    event.preventDefault()
    await authService.postLogin(email, password)
      .then(() => router.push('/'))
      .catch((codes) => {
        if (codes) {
          console.log(codes)
          setErrorCodes(codes)
        } {
          setErrorCodes(["login.messages.default"])
        }
      })
  }

  const handleSignup = async () => {
    router.push('/register')
  }

  return (
    <form onSubmit={submit} className="flex flex-col grid gap-5 w-80 max-w-80">
      <input
        className="p-2 rounded border border-solid"
        type="text"
        placeholder={dict.login['email']}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoCapitalize='none'
      />
      <input
        className="p-2 rounded border border-solid"
        type="password"
        placeholder={dict.login['password']}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoCapitalize='none'
      />
      <div>{
        errorCodes.map((code, index) => <p className='m-y-1.5 text-red-600 italic text-center' key={code + index}>{dict.login.messages[code] ?? dict.login.messages['default']}</p>)
      }</div>

      <button className='p-2 rounded bg-secondary font-sans font-bold' type='submit'>
        {dict.login.login}
      </button>
      <button onClick={handleSignup} className='rounded border border-black/40 p-2' type='button'>
      {dict.login.signup}
      </button>
    </form>
  )
}