"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useTranslation } from "react-i18next"
import Link from "next/link"

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          {/* App name */}
          <div className="flex items-center justify-center">
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              {t("app.name")}
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/about" className="hover:text-emerald-600 transition-colors">
              {t("nav.about")}
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
            <span>© {currentYear} {t("app.name")}.</span>
            <span>{t("footer.madeWith")}</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>{t("footer.forUmmah")}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
