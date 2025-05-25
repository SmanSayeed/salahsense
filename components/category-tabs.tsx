"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TopicSlider } from "@/components/topic-slider"
import { loadCategories, loadTopics } from "@/lib/data-loader"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import type { Topic, Category } from "@/types"

export function CategoryTabs() {
  const { t, i18n } = useTranslation()
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [categoryTopics, setCategoryTopics] = useState<Topic[]>([])
  const [allTopics, setAllTopics] = useState<Topic[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, topicsData] = await Promise.all([loadCategories(), loadTopics()])
        if (Array.isArray(categoriesData) && categoriesData.length > 0) {
          setCategories(categoriesData)
          setSelectedCategory(categoriesData[0])
        }
        if (Array.isArray(topicsData)) {
          setAllTopics(topicsData)
        }
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (selectedCategory && allTopics.length > 0) {
      const filtered = allTopics.filter((topic) => topic.category_id === selectedCategory.id).slice(0, 10)
      setCategoryTopics(filtered)
    }
  }, [selectedCategory, allTopics])

  if (!Array.isArray(categories) || categories.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("categories.title")}</h2>
        <p className="text-muted-foreground">{t("categories.description")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t("categories.browse")}</span>
            <Link href="/categories">
              <Button variant="outline" size="sm">
                {t("categories.viewAll")}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {Array.isArray(categories) && categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory?.id === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {i18n.language === "en" ? category.english_category : category.bangla_category}
              </Button>
            ))}
          </div>

          {/* Category Topics */}
          {Array.isArray(categoryTopics) && categoryTopics.length > 0 && selectedCategory && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {i18n.language === "en" ? selectedCategory.english_category : selectedCategory.bangla_category}
                </h3>
                <Link href={`/category/${encodeURIComponent(selectedCategory.id)}`}>
                  <Button variant="ghost" size="sm">
                    {t("categories.seeAll")}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <TopicSlider topics={categoryTopics} title="" />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.section>
  )
}
