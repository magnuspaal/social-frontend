
import Search from "@/components/search/Search";
import { getDictionary } from "@/lang/lang";

export default async function SearchPage({ params }: any) {

  const dict = await getDictionary(params.lang)

  return (
    <div className="p-2 divide-black/40 border border-black/40 rounded">
      <Search dict={dict}></Search>
    </div>
  )
}