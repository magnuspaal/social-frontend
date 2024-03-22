
import Search from "@/components/search/Search";

export default async function SearchPage({ params }: any) {
  return (
    <div className="p-2 divide-black/40 border border-black/40 rounded w-full">
      <Search />
    </div>
  )
}