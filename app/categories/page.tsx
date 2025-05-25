"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { loadCategories } from "@/lib/data-loader"
import { CategoryGrid } from "@/components/category-grid"
import { useTranslation } from "react-i18next"
import type { Category } from "@/types"

export default function CategoriesPage() {
  const { t } = useTranslation()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const loadData = async () => {
      const data = await loadCategories()
      if (Array.isArray(data)) {
        setCategories(data)
      }
    }
    loadData()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("categories.title")}</h1>
          <p className="text-muted-foreground">{t("categories.description")}</p>
        </div>

        <CategoryGrid categories={categories} />
      </motion.div>
    </div>
  )
} 