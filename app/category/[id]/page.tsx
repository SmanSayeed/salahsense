"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { loadCategories, loadTopics } from "@/lib/data-loader"
import { TopicGrid } from "@/components/topic-grid"
import { useTranslation } from "react-i18next"
import type { Category, Topic } from "@/types"

export default function CategoryPage() {
  const params = useParams()
  const { t, i18n } = useTranslation()
  const [category, setCategory] = useState<Category | null>(null)
  const [topics, setTopics] = useState<Topic[]>([])

  useEffect(() => {
    const loadData = async () => {
      const categoryId = params.id as string
      const categories = await loadCategories()
      const topics = await loadTopics()
      
      if (Array.isArray(categories)) {
        const foundCategory = categories.find(c => c.id === categoryId)
        if (foundCategory) {
          setCategory(foundCategory)
          if (Array.isArray(topics)) {
            const categoryTopics = topics.filter(topic => topic.categoryId === categoryId)
            setTopics(categoryTopics)
          }
        }
      }
    }
    loadData()
  }, [params.id])

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-muted-foreground">{t("category.notFound")}</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {i18n.language === "en" ? category.english_category : category.bangla_category}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {i18n.language === "en" ? category.english_description : category.bangla_description}
          </p>
        </div>

        <TopicGrid topics={topics} />
      </motion.div>
    </div>
  )
} 