'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import authService from '@/lib/auth-service';

export default function LoginForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const submit = async(event: any) => {
    event.preventDefault()
    try {
      await authService.postLogin(email, password)
    } catch (err: any) {
      setError(err.message)
    }
    router.push("/")
  }

  return (
    <form onSubmit={submit} className="flex flex-col grid gap-5">
      <input
        className="p-2 rounded border border-solid"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="p-2 rounded border border-solid"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className='m-y-1.5 text-red-600 italic text-center'>{error}</p>
      <button className='p-2 rounded bg-secondary font-sans font-bold' type='submit'>
        LOGIN
      </button>
    </form>
  )
}