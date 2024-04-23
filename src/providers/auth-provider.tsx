import useAuthCookies from "@/hooks/use-auth-cookies";
import AuthCookies from "@/services/interfaces/auth-cookies";
import { logInfo } from "@/utils/development-utils";
import { createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<{
  user: AuthCookies,
  login: (doNotRedirect?: boolean) => void,
  logout: (() => void),
  handleTokenRefresh: (() => Promise<boolean>)
}>({user: {}, login: () => {}, logout: () => {}, handleTokenRefresh: async () => {return false}});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, getAuthCookies, removeUser } = useAuthCookies();

  const navigate = useNavigate();

  const login = (doNotRedirect?: boolean) => {
    getAuthCookies()
    if (!doNotRedirect) {
      navigate("/");
    }
  };

  const logout = () => {
    removeUser()
    navigate("/login", { replace: true });
  };

  const getRefreshToken = async (): Promise<boolean> => {
    return fetch(import.meta.env.VITE_AUTH_API_URL + "/refresh", 
      {method: "GET", credentials: 'include', headers: { "Content-Type": "application/json"}}
    ).then(async (res: Response) => {
      logInfo("Called:", import.meta.env.VITE_AUTH_API_URL + "/refresh", res.status)
      return res.ok
    })
  }

  const handleTokenRefresh = async (): Promise<boolean> => {
    return getRefreshToken().then((refreshed: boolean) => {
      if (!refreshed) {
        logout()
        return false
      } else {
        login(true)
        return true
      }
    }).catch(() => {
      logout()
      return false
    })
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      handleTokenRefresh
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};