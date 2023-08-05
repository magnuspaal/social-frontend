import { getDictionary } from "@/lang/lang";
import RegisterForm from "./RegisterForm";

export default async function Login({params}: any) {

  const dict = await getDictionary(params.lang)
  
  return (
    <div className="flex items-center justify-center h-full">
      <RegisterForm dict={dict}/>
    </div>
  )
}