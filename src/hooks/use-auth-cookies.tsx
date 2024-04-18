// src/hooks/useLocalStorage.jsx

import { useState } from "react";
import cookies from 'js-cookie'
import AuthCookies from "@/services/interfaces/auth-cookies";
import { isProduction } from "@/utils/development-utils";

const useAuthCookies = () => {

  const [user, setStoredUser] = useState<AuthCookies>({
      authToken: cookies.get('authToken'),
      refreshToken: cookies.get('refreshToken'),
      expiresAt: cookies.get('expiresAt')
  });

  const setUser = (newValue: AuthCookies) => {
    try {
      const secure = isProduction()
      const domain = import.meta.env.VITE_WEBSOCKET_DOMAIN
      if (newValue.authToken) cookies.set("authToken", newValue.authToken, { expires: 60 * 10 / 86400, secure, domain})
      if (newValue.refreshToken) cookies.set("refreshToken", newValue.refreshToken, { expires: 60 * 60 * 24 * 30 * 6 / 86400, secure, domain, sameSite: "lax" })
      if (newValue.expiresAt) cookies.set("expiresAt", newValue.expiresAt, { expires: 60 * 60 * 24 * 30 * 6 / 86400, secure, domain, sameSite: "lax"})
    } catch (err) {
      console.log(err);
    }
    setStoredUser(newValue);
  };

  const removeUser = () => {
    cookies.remove("authToken")
    cookies.remove("refreshToken")
    cookies.remove("expiresAt")
    localStorage.removeItem("privateKey")
    setStoredUser({})
  }

  return {user, setUser, removeUser};
};

export default useAuthCookies