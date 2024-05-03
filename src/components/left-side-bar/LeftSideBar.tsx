

import NavigationMenu from "./NavigationMenu";

export default function LeftSideBar() {

  return (
    <div className="bg-background sm:rounded-xl md:max-w-sm p-5 col-span-1 xl:min-w-[250px] max-sm:w-full max-sm:rounded-none max-sm:shadow-up">
      <NavigationMenu />
    </div>
  )
}