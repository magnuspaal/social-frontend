import { createBrowserRouter } from "react-router-dom"
import Login from '@/app/login/Login'
import Register from "@/app/login/Register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);

export default router;