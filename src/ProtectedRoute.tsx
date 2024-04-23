import { useContext, useEffect } from "react";
import { AuthContext } from "./providers/auth-provider";
import Loading from "./components/common/Loading";
import { Outlet } from "react-router-dom";

export const ProtectedRoute = () => {

  const { authToken, login, handleTokenRefresh } = useContext(AuthContext);

  useEffect(() => {
    const authenticate = async () => {
      if (!authToken) {
        await handleTokenRefresh()
        login(true)
      }
    }
    authenticate()
  }, [])

  return (
    <>
    {
      authToken == undefined ?
      <Loading /> :
      <Outlet />
    }
    </>
  )
};