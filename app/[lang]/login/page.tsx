import { getDictionary } from "@/lang/lang";
import LoginForm from "./LoginForm";

export default async function Login({params}: any) {

  const dict = await getDictionary(params.lang)

  return (
    <div className="flex items-center justify-center h-full">
      <LoginForm dict={dict}/>
    </div>
  )
}