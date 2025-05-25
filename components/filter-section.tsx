"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TopicSlider } from "@/components/topic-slider"
import { useDebounce } from "@/hooks/use-debounce"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setSelectedCategory, setTopicFilter } from "@/store/slices/filterSlice"
import { loadCategories, loadTopics } from "@/lib/data-loader"
import { useTranslation } from "react-i18next"
import type { Topic, Category } from "@/types"

export function FilterSection() {
  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const { selectedCategory, topicFilter } = useAppSelector((state) => state.filter)

  const [categoryInput, setCategoryInput] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([])
  const [selectedCategoryData, setSelectedCategoryData] = useState<Category | null>(null)

  const debouncedCategoryInput = useDebounce(categoryInput, 300)
  const debouncedTopicFilter = useDebounce(topicFilter, 300)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, topicsData] = await Promise.all([loadCategories(), loadTopics()])
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData)
          setFilteredCategories(categoriesData)
        }
        if (Array.isArray(topicsData)) {
          setTopics(topicsData)
          setFilteredTopics(topicsData)
        }
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (selectedCategory && Array.isArray(categories)) {
      const category = categories.find(c => c.id === selectedCategory)
      setSelectedCategoryData(category || null)
    }
  }, [selectedCategory, categories])

  useEffect(() => {
    if (debouncedCategoryInput && Array.isArray(categories)) {
      const filtered = categories.filter((category) => {
        const categoryName = i18n.language === "en" ? category.english_category : category.bangla_category
        return categoryName.toLowerCase().includes(debouncedCategoryInput.toLowerCase())
      })
      setFilteredCategories(filtered)
    } else {
      setFilteredCategories(categories)
    }
  }, [debouncedCategoryInput, categories, i18n.language])

  useEffect(() => {
    if (!Array.isArray(topics)) return

    let filtered = topics

    if (selectedCategory) {
      filtered = filtered.filter((topic) => topic.category_id === selectedCategory)
    }

    if (debouncedTopicFilter) {
      filtered = filtered.filter(
        (topic) =>
          topic.topic_bangla.toLowerCase().includes(debouncedTopicFilter.toLowerCase()) ||
          topic.topic_english.toLowerCase().includes(debouncedTopicFilter.toLowerCase()) ||
          topic.bangla.toLowerCase().includes(debouncedTopicFilter.toLowerCase()) ||
          topic.english.toLowerCase().includes(debouncedTopicFilter.toLowerCase()),
      )
    }

    setFilteredTopics(filtered)
  }, [topics, selectedCategory, debouncedTopicFilter])

  const handleCategorySelect = (category: Category) => {
    dispatch(setSelectedCategory(category.id))
    setCategoryInput(i18n.language === "en" ? category.english_category : category.bangla_category)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("filter.title")}</h2>
        <p className="text-muted-foreground">{t("filter.description")}</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Category Filter */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-emerald-600" />
              <label className="text-sm font-medium">{t("filter.category")}</label>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("filter.categoryPlaceholder")}
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Suggestions */}
            {Array.isArray(filteredCategories) && filteredCategories.length > 0 && (
              <div className="grid gap-2 max-h-40 overflow-y-auto">
                {filteredCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="justify-start text-left h-auto p-3"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {i18n.language === "en" ? category.english_category : category.bangla_category}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Topic Filter */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-emerald-600" />
              <label className="text-sm font-medium">{t("filter.topic")}</label>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("filter.topicPlaceholder")}
                value={topicFilter}
                onChange={(e) => dispatch(setTopicFilter(e.target.value))}
                className="pl-10"
              />
            </div>
          </div>

          {/* Selected Category */}
          {selectedCategoryData && (
            <div className="pt-2">
              <p className="text-sm font-medium text-emerald-600">
                {i18n.language === "en" ? selectedCategoryData.english_category : selectedCategoryData.bangla_category}
              </p>
            </div>
          )}

          {/* Filtered Topics */}
          {Array.isArray(filteredTopics) && filteredTopics.length > 0 && (
            <div className="pt-4">
              <TopicSlider topics={filteredTopics} title={t("filter.results")} />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.section>
  )
}
