'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import authService from '@/services/auth-service';

export default function LoginForm({dict}: any) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorCodes, setErrorCodes] = useState([])

  const router = useRouter()

  const submit = async(event: any) => {
    event.preventDefault()
    await authService.postLogin(email, password)
      .then(() => router.push('/'))
      .catch((codes) => setErrorCodes(codes))
  }

  const handleSignup = async () => {
    router.push('/register')
  }

  return (
    <form onSubmit={submit} className="flex flex-col grid gap-5">
      <input
        className="p-2 rounded border border-solid"
        type="text"
        placeholder={dict.login['email']}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="p-2 rounded border border-solid"
        type="password"
        placeholder={dict.login['password']}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>{
        errorCodes.map((code, index) => <p className='m-y-1.5 text-red-600 italic text-center' key={code + index}>{dict.login.messages[code] ?? dict.login.messages['default']}</p>)
      }</div>

      <button className='p-2 rounded bg-secondary font-sans font-bold' type='submit'>
        LOGIN
      </button>
      <button onClick={handleSignup} className='rounded border border-black/40 p-2' type='button'>
        SIGN UP
      </button>
    </form>
  )
}