// src/hooks/useLocalStorage.jsx

import cookies from 'js-cookie'
import { useState } from 'react';

const useAuthCookies = () => {

  const [authToken, setAuthToken] = useState<string | undefined>(cookies.get("authToken"))

  const getAuthToken = () => {
    const cookie = cookies.get("authToken")
    setAuthToken(cookie)
    return authToken
  }

  const removeUser = () => {
    cookies.remove("authToken")
    cookies.remove("expiresAt")
    localStorage.removeItem("privateKey")
  }

  return {authToken, getAuthToken, removeUser};
};

export default useAuthCookies