

import { AuthContext } from "@/providers/auth-provider";
import LoginForm from "./LoginForm";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

export default function Login() {

  const { user } = useContext(AuthContext);

  return !user.authToken || !user.expiresAt || !user.privateKey ?
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center justify-center max-sm:flex-col">
        <div className="bg-blue-100 max-w-[300px] rounded border border-blue-700 p-3 sm:mr-6 max-sm:mb-3">
          <div>If you don&apos;t want to create an account you can use the following credentials.</div>
          <br></br>
          <div>Username: <strong>guest@guest</strong></div>
          <div>Password: <strong>123456</strong></div>
          <br></br>
          <div> Posting for the user is disabled. All other actions are allowed.</div>
        </div>
        <LoginForm />
      </div>
  </div> : <Navigate to="/" />
}