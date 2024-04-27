// src/hooks/useLocalStorage.jsx

import AuthCookies from '@/services/interfaces/auth-cookies';
import cookies from 'js-cookie'
import { useState } from 'react';

const useAuthCookies = () => {

  const [user, setUser] = useState<AuthCookies>({
    authToken: cookies.get("authToken"),
    expiresAt: cookies.get("expiresAt"),
    privateKey: localStorage.getItem("privateKey") ?? undefined
  })

  const getAuthCookies = (): AuthCookies => {
    setUser({
      authToken: cookies.get("authToken"),
      expiresAt: cookies.get("expiresAt"),
      privateKey: localStorage.getItem("privateKey") ?? undefined
    })
    return user
  }

  const removeUser = () => {
    cookies.remove("authToken")
    cookies.remove("expiresAt")
    localStorage.removeItem("privateKey")
    setUser({})
  }

  return {user, getAuthCookies, removeUser};
};

export default useAuthCookies