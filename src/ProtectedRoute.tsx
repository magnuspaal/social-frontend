import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./providers/auth-provider";

export const ProtectedRoute = ({children}: {children: React.ReactNode}) => {

  const { user } = useContext(AuthContext);

  if (!user?.authToken || !user?.refreshToken || !user?.expiresAt) {
    return <Navigate to="/login" />
  }
  return children;
};