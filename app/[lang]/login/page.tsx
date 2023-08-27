import { getDictionary } from "@/lang/lang";
import LoginForm from "./LoginForm";

export default async function Login({params}: any) {

  const dict = await getDictionary(params.lang)

  return (
    <div className="flex items-center justify-center max-sm:flex-col">
      <div className="bg-blue-100 max-w-[300px] rounded border border-blue-700 p-3 sm:mr-6 max-sm:mb-3">
        <div>If you don&apos;t want to create an account you can use the following credentials.</div>
        <br></br>
        <div>Username: <strong>guest@guest</strong></div>
        <div>Password: <strong>123456</strong></div>
        <br></br>
        <div> Posting for the user is disabled. All other actions are allowed.</div>
      </div>
      <LoginForm dict={dict}/>
    </div>
  )
}