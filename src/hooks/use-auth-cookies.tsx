// src/hooks/useLocalStorage.jsx

import { useState } from "react";
import cookies from 'js-cookie'
import AuthCookies from "@/services/interfaces/auth-cookies";
import { isProduction } from "@/utils/development-utils";

const useAuthCookies = () => {

  const [user, setStoredUser] = useState<AuthCookies>({
      authToken: cookies.get('authToken'),
      refreshToken: localStorage.getItem("refreshToken") ?? undefined,
      expiresAt: localStorage.getItem("expiresAt") ?? undefined
  });

  const setUser = (newValue: AuthCookies) => {
    try {
      const secure = isProduction()
      const domain = import.meta.env.VITE_WEBSOCKET_DOMAIN
      if (newValue.authToken) cookies.set("authToken", newValue.authToken, { expires: 60 * 10 / 86400, secure, domain})
      if (newValue.refreshToken) localStorage.setItem("refreshToken", newValue.refreshToken)
      if (newValue.expiresAt) localStorage.setItem("expiresAt", newValue.expiresAt)
    } catch (err) {
      console.log(err);
    }
    setStoredUser(newValue);
  };

  const removeUser = () => {
    cookies.remove("authToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("expiresAt")
    localStorage.removeItem("privateKey")
    setStoredUser({})
  }

  return {user, setUser, removeUser};
};

export default useAuthCookies