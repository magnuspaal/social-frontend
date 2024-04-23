import { useContext, useEffect } from "react";
import { AuthContext } from "./providers/auth-provider";
import Loading from "./components/common/Loading";
import { Outlet } from "react-router-dom";

export const ProtectedRoute = () => {

  const { user, handleTokenRefresh } = useContext(AuthContext);

  useEffect(() => {
    const authenticate = async () => {
      if (!user.authToken) {
        await handleTokenRefresh()
      }
    }
    authenticate()
  }, [])

  return (
    <>
    {
      !user.authToken ?
      <Loading /> :
      <Outlet />
    }
    </>
  )
};