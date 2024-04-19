import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./providers/auth-provider";
import Loading from "./components/common/Loading";

export const ProtectedRoute = ({children}: {children: React.ReactNode}) => {

  const { user, handleTokenRefresh } = useContext(AuthContext);

  useEffect(() => {
    const authenticate = async () => {
      if (!user?.authToken) {
        if (user?.refreshToken) {
          await handleTokenRefresh()
        } else {
          return <Navigate to="/login" />
        }
      } else if (!user.refreshToken) {
        return <Navigate to="/login" />
      }
    }
    authenticate()
  }, [])

  return (
    <>
    {
      (!user?.authToken || !user?.refreshToken || !user?.expiresAt) ?
      <Loading /> :
      children
    }
    </>
  )
};