"use client"

import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { SearchBar } from "@/components/search-bar"

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="py-1">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-0.5"
        >
          <h1 className="text-base md:text-lg font-medium">
            {t("hero.title")}
          </h1>
          <p className="text-xs text-muted-foreground max-w-xl mx-auto">
            {t("hero.subtitle")}
          </p>
          <div className="max-w-lg mx-auto pt-1">
            <SearchBar />
          </div>
        </motion.div>
      </div>
    </section>
  )
} 