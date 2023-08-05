'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import authService from '@/lib/auth-service';

export default function RegisterForm({dict}: any) {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [errorCodes, setErrorCodes] = useState([])

  const router = useRouter()

  const submit = async(event: any) => {
    event.preventDefault()
    setErrorCodes([])
    await authService.postRegister(email, password, firstName, lastName, username)
      .then(() => router.push("/login")).catch((codes) => { setErrorCodes(codes)})
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
            {dict.register.messages[code] ?? dict.register.messages['default']}
          </p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col grid gap-5 w-[300px] max-w-[300px] w-full">

      <div className='flex flex-col'>
        <label htmlFor="username" className='font-semibold text-md'>{dict.register.username}</label>
        <input className={`p-2 rounded border border-black border-solid ${getErrorsFor('username').length && 'border-2 border-rose-500'}`} type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        {renderErrorMessageFor('username')}
      </div>

      <div className='flex flex-col'>
        <label htmlFor="email" className='font-semibold text-md'>{dict.register.email}</label>
        <input className={`p-2 rounded border border-black  border-solid ${getErrorsFor('email').length && 'border-2 border-rose-500'}`} type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {renderErrorMessageFor('email')}
      </div>

      <div className='flex flex-col'>
        <label htmlFor="password" className='font-semibold text-md'>{dict.register.password}</label>
        <input className={`p-2 rounded border border-black  border-solid ${getErrorsFor('password').length && 'border-2 border-rose-500'}`} type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {renderErrorMessageFor('password')}
      </div>

      <div className='flex flex-col'>
        <label htmlFor="first-name" className='font-semibold text-md'>{dict.register.firstname}</label>
        <input className={`p-2 rounded border border-black border-solid ${getErrorsFor('firstname').length  && 'border-2 border-rose-500'}`} type="text" id='first-name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        {renderErrorMessageFor('firstname')}
      </div>


      <div className='flex flex-col'>
        <label htmlFor="last-name" className='font-semibold text-md'>{dict.register.lastname}</label>
        <input className={`p-2 rounded border border-black border-solid ${getErrorsFor('lastname').length  && 'border-2 border-rose-500'}`} type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        {renderErrorMessageFor('lastname')}
      </div>
      
      <button className='p-2 rounded bg-secondary font-sans font-bold' type='submit'>
        {dict.register.signup}
      </button>
    </form>
  )
}