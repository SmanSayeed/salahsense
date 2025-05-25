import { TopicDetailPage } from "@/components/topic-detail-page"
import { Suspense } from "react"
import { LoadingSkeleton } from "@/components/loading-skeleton"

interface TopicPageProps {
  params: {
    id: string
  }
}

export default function Topic({ params }: TopicPageProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <TopicDetailPage topicId={Number.parseInt(params.id)} />
    </Suspense>
  )
}
