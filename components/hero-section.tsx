"use client"

import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="text-center py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 bg-clip-text text-transparent leading-tight"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          {t("hero.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-2xl md:text-3xl font-arabic text-emerald-700 mt-8"
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </motion.div>
      </motion.div>
    </section>
  )
}
