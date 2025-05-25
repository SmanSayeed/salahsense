import { CategoryPage } from "@/components/category-page"
import { Suspense } from "react"
import { LoadingSkeleton } from "@/components/loading-skeleton"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function Category({ params }: CategoryPageProps) {
  const categoryId = parseInt(decodeURIComponent(params.slug), 10)

  if (isNaN(categoryId)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-muted-foreground">Invalid category ID</p>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CategoryPage categoryId={categoryId} />
    </Suspense>
  )
}
