import { HeroSection } from "@/components/hero-section"
import { FilterSection } from "@/components/filter-section"
import { FeaturedSection } from "@/components/featured-section"
import { CategoryTabs } from "@/components/category-tabs"
import { Suspense } from "react"
import { LoadingSkeleton } from "@/components/loading-skeleton"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <HeroSection />

      <Suspense fallback={<LoadingSkeleton />}>
        <FilterSection />
      </Suspense>

      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedSection />
      </Suspense>

      <Suspense fallback={<LoadingSkeleton />}>
        <CategoryTabs />
      </Suspense>
    </div>
  )
}
