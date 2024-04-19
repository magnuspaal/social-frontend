import useAuthCookies from "@/hooks/use-auth-cookies";
import AuthCookies from "@/services/interfaces/auth-cookies";
import { logInfo, logVerbose } from "@/utils/development-utils";
import { createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<{
  user: AuthCookies,
  login: ((data: AuthCookies, doNotRedirect?: boolean) => void), 
  logout: (() => void),
  handleTokenRefresh: (() => Promise<{authenticated: boolean}>)
}>({user: {}, login: () => {}, logout: () => {}, handleTokenRefresh: async () => {return {authenticated: false}}});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser, removeUser } = useAuthCookies();

  const navigate = useNavigate();

  const login = (data: AuthCookies, doNotRedirect?: boolean) => {
    setUser(data);
    if (!doNotRedirect) {
      navigate("/");
    }
  };

  const logout = () => {
    removeUser()
    navigate("/login", { replace: true });
  };

  const postRefreshToken = async (refreshToken: string) => {
    return fetch(import.meta.env.VITE_AUTH_API_URL + "/refresh", 
    {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({refreshToken})}
    )
      .then(async (res: Response) => {
        logInfo("Called:", import.meta.env.VITE_AUTH_API_URL + "/refresh", res.status)
        if (res.ok) {
          const body = await res.json()
          logVerbose("Fetch body:", body)
          return body
        }
      })
  }

  const handleTokenRefresh = async (): Promise<{authenticated: boolean}> => {
    const cookiesRefreshToken = user.refreshToken
    if (cookiesRefreshToken) {
      return postRefreshToken(cookiesRefreshToken).then((body) => {
        login({authToken: body.token, refreshToken: body.refreshToken, expiresAt: body.expiresAt}, true)
        return {authenticated: true}
      }).catch(() => {
        logout()
        return {authenticated: false}
      })
    } else {
      logout()
      return {authenticated: false}
    }
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