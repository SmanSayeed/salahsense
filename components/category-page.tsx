"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TopicCard } from "@/components/topic-card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { useDebounce } from "@/hooks/use-debounce"
import { getTopicsByCategory, loadCategories } from "@/lib/data-loader"
import { useTranslation } from "react-i18next"
import type { Topic, Category } from "@/types"

interface CategoryPageProps {
  categoryId: number
}

export function CategoryPage({ categoryId }: CategoryPageProps) {
  const { t, i18n } = useTranslation()
  const [topics, setTopics] = useState<Topic[]>([])
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<Category | null>(null)

  const debouncedSearch = useDebounce(searchQuery, 300)

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        setLoading(true)
        const [categoryTopics, categories] = await Promise.all([
          getTopicsByCategory(categoryId),
          loadCategories()
        ])
        
        const currentCategory = categories.find(c => c.id === categoryId)
        if (!currentCategory) {
          throw new Error("Category not found")
        }
        
        setCategory(currentCategory)
        setTopics(categoryTopics)
        setFilteredTopics(categoryTopics)
      } catch (err) {
        setError("Failed to load topics")
        console.error("Error loading category topics:", err)
      } finally {
        setLoading(false)
      }
    }

    loadCategoryData()
  }, [categoryId])

  useEffect(() => {
    if (debouncedSearch) {
      const filtered = topics.filter(
        (topic) =>
          topic.topic_bangla.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          topic.topic_english.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          topic.bangla.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          topic.english.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          topic.arabic.includes(debouncedSearch),
      )
      setFilteredTopics(filtered)
    } else {
      setFilteredTopics(topics)
    }
  }, [debouncedSearch, topics])

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error || !category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-muted-foreground">{error || "Category not found"}</p>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [{ label: i18n.language === "en" ? category.english_category : category.bangla_category }]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {i18n.language === "en" ? category.english_category : category.bangla_category}
          </h1>
          <p className="text-muted-foreground">
            {topics.length} {topics.length === 1 ? "topic" : "topics"} found
          </p>
        </div>

        {/* Search Filter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>{t("filter.topic")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("filter.topicPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Topics Grid */}
        {filteredTopics.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TopicCard topic={topic} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No topics found matching your search.</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
