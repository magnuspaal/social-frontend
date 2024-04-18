

import { ProtectedRoute } from "@/ProtectedRoute";
import Search from "@/components/search/Search";

export default function SearchPage() {
  return (
    <ProtectedRoute>
      <div className="p-2 divide-black/40 border border-black/40 rounded w-full">
        <Search />
      </div>
    </ProtectedRoute>
  )
}