"use client"

import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { toggleBookmark } from "@/store/slices/bookmarkSlice"
import { AudioPlayer } from "@/components/audio-player"
import type { Topic } from "@/types"

interface TopicDetailsProps {
  topic: Topic
}

const renderHTML = (html: string) => {
  return { __html: html || "" }
}

export function TopicDetails({ topic }: TopicDetailsProps) {
  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const bookmarks = useAppSelector((state) => state.bookmarks.items)
  const isBookmarked = bookmarks.includes(topic.id)

  const handleBookmark = () => {
    dispatch(toggleBookmark(topic.id))
  }

  const getTopicTitle = () => {
    return i18n.language === "en" ? topic.topic_english : topic.topic_bangla
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-2xl font-semibold">{getTopicTitle()}</h1>
          <Button variant="ghost" size="icon" onClick={handleBookmark}>
            {isBookmarked ? (
              <BookmarkCheck className="h-5 w-5 text-emerald-600" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Arabic text */}
        <div 
          className="text-right font-arabic text-3xl text-emerald-700 leading-relaxed mb-6"
          dangerouslySetInnerHTML={renderHTML(topic.arabic)}
        />

        {/* Translation */}
        <div 
          className="text-lg mb-6"
          dangerouslySetInnerHTML={renderHTML(i18n.language === "en" ? topic.english : topic.bangla)}
        />

        {/* Details */}
        <div 
          className="text-muted-foreground"
          dangerouslySetInnerHTML={renderHTML(i18n.language === "en" ? topic.details_in_english : topic.details_in_bangla)}
        />

        {/* Audio player */}
        {topic.audio && (
          <div className="mt-6">
            <AudioPlayer src={topic.audio} />
          </div>
        )}

        {/* Category tag */}
        <div className="mt-6">
          <span className="inline-block bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full">
            {topic.category}
          </span>
        </div>
      </CardContent>
    </Card>
  )
} 