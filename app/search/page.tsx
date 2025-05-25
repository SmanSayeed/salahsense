import { Suspense } from "react"
import { SearchResults } from "@/components/search/search-results"
import { SearchSkeleton } from "@/components/search/search-skeleton"

interface SearchPageProps {
  searchParams: { q?: string; category?: string }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const category = searchParams.category || ""

  return (
    <div className="container space-y-8 py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Search Results</h1>
        <p className="text-muted-foreground">
          {query
            ? `Showing results for "${query}"`
            : "Browse all prayers and duas"}
        </p>
      </div>

      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults query={query} category={category} />
      </Suspense>
    </div>
  )
} 