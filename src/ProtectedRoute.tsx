import { useContext, useEffect } from "react";
import { AuthContext } from "./providers/auth-provider";
import Loading from "./components/common/Loading";

export const ProtectedRoute = ({children}: {children: React.ReactNode}) => {

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
      children
    }
    </>
  )
};