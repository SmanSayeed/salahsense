"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { TopicSlider } from "@/components/topic-slider"
import { loadTopics } from "@/lib/data-loader"
import { useTranslation } from "react-i18next"
import type { Topic } from "@/types"

export function FeaturedSection() {
  const { t } = useTranslation()
  const [featuredTopics, setFeaturedTopics] = useState<Topic[]>([])

  useEffect(() => {
    const loadFeaturedTopics = async () => {
      try {
        const topics = await loadTopics()
        if (Array.isArray(topics)) {
          const featured = topics.filter((topic) => topic.featured).slice(0, 10)
          setFeaturedTopics(featured)
        }
      } catch (error) {
        console.error("Error loading featured topics:", error)
      }
    }
    loadFeaturedTopics()
  }, [])

  if (!Array.isArray(featuredTopics) || featuredTopics.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Star className="h-6 w-6 text-yellow-500 fill-current" />
          <h2 className="text-3xl md:text-4xl font-bold">{t("featured.title")}</h2>
          <Star className="h-6 w-6 text-yellow-500 fill-current" />
        </div>
        <p className="text-muted-foreground">{t("featured.description")}</p>
      </div>

      <TopicSlider topics={featuredTopics} title="" />
    </motion.section>
  )
}
