import apiService from "@/lib/api-service";
import NavigationMenu from "./NavigationMenu";

export default function LeftSideBar() {

  return (
    <div className="border border-black/40 mr-5 max-w-sm p-5 col-span-1 max-w-sm w-full">
      <NavigationMenu />
    </div>
  )
}