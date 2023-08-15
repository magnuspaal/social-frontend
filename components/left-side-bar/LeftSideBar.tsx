import NavigationMenu from "./NavigationMenu";

export default async function LeftSideBar({params}: any) {

  return (
    <div className="border border-black/40 rounded max-w-sm p-5 col-span-1 xl:min-w-[250px]">
      <NavigationMenu params={params}/>
    </div>
  )
}