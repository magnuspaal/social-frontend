

import NavigationMenu from "./NavigationMenu";

export default function LeftSideBar() {

  return (
    <div className="bg-background border border-black/40 sm:rounded md:max-w-sm p-5 col-span-1 xl:min-w-[250px] max-sm:w-full max-sm:rounded-t">
      <NavigationMenu />
    </div>
  )
}