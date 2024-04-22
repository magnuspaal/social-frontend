import useAuthCookies from "@/hooks/use-auth-cookies";
import { logInfo } from "@/utils/development-utils";
import { createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<{
  authToken: string | undefined,
  login: (doNotRedirect?: boolean) => void,
  logout: (() => void),
  handleTokenRefresh: (() => Promise<boolean>)
}>({authToken: undefined, login: () => {}, logout: () => {}, handleTokenRefresh: async () => {return false}});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { authToken, getAuthToken, removeUser } = useAuthCookies();

  const navigate = useNavigate();

  const login = (doNotRedirect?: boolean) => {
    getAuthToken()
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
      authToken,
      login,
      logout,
      handleTokenRefresh
    }),
    [authToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};