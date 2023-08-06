import apiService from "@/services/api-service"
import AccountPreview from "./AccountPreview"

export default async function AccountsPreview() {

  const accounts = await apiService.getAccounts()

  return (
    <div className="flex flex-col items-center grid gap-4 divide-y divide-black/40">
      <div className="">Accounts to follow</div>
      {accounts.map(((account) => <AccountPreview account={account} key={account.id}></AccountPreview>))}
    </div>
  )
}