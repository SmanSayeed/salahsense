"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Play, Bookmark, BookmarkCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { toggleBookmark } from "@/store/slices/bookmarkSlice"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import type { Topic, Category } from "@/types"
import { loadCategories } from "@/lib/data-loader"

interface TopicCardProps {
  topic: Topic
}

const truncateText = (text: string) => {
  if (!text) return ""
  // Create a temporary div to render HTML and get plain text
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = text
  const plainText = tempDiv.textContent || tempDiv.innerText || ""
  return plainText.length > 80 ? plainText.slice(0, 80).trim() + "..." : plainText
}

const renderHTML = (html: string) => {
  return { __html: html }
}

export function TopicCard({ topic }: TopicCardProps) {
  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const bookmarks = useAppSelector((state) => state.bookmarks.items)
  const isBookmarked = bookmarks.includes(topic.id)
  const [category, setCategory] = useState<Category | null>(null)

  useEffect(() => {
    const loadCategoryData = async () => {
      const categories = await loadCategories()
      const currentCategory = categories.find(c => c.id === topic.category_id)
      if (currentCategory) {
        setCategory(currentCategory)
      }
    }
    loadCategoryData()
  }, [topic.category_id])

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleBookmark(topic.id))
  }

  const getPreviewText = () => {
    if (i18n.language === "en") {
      return truncateText(topic.details_in_english || topic.english)
    }
    return truncateText(topic.details_in_bangla || topic.bangla)
  }

  const getTopicTitle = () => {
    return i18n.language === "en" ? topic.topic_english : topic.topic_bangla
  }

  const getCategoryName = () => {
    if (!category) return ""
    return i18n.language === "en" ? category.english_category : category.bangla_category
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={`/topic/${topic.id}`}>
        <Card className="h-[24rem] hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 flex flex-col h-full">
            {/* Header with Title and Bookmark */}
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-lg leading-tight line-clamp-2 flex-grow">
                {getTopicTitle()}
              </h3>
              <Button variant="ghost" size="icon" onClick={handleBookmark} className="flex-shrink-0 ml-2">
                {isBookmarked ? (
                  <BookmarkCheck className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Arabic text */}
            <p className="text-right font-arabic text-lg text-emerald-700 leading-relaxed mb-3 line-clamp-2">
              {topic.arabic}
            </p>

            {/* Translation */}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {i18n.language === "en" ? topic.english : topic.bangla}
            </p>

            {/* Preview text */}
            <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">
              {getPreviewText()}
            </p>

            {/* Footer with Category and Audio */}
            <div className="pt-2 mt-auto flex items-center justify-between">
              <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                {getCategoryName()}
              </span>
              {topic.audio && (
                <div className="bg-emerald-600 text-white p-2 rounded-full">
                  <Play className="h-4 w-4" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
