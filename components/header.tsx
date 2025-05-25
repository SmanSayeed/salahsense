"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, RotateCcw, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/language-toggle"
import { PWAInstallButton } from "@/components/pwa-install-button"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/categories", label: t("nav.categories") },
    { href: "/about", label: t("nav.about") },
  ]

  const handleClearCacheAndReload = async () => {
    try {
      // Clear localStorage
      localStorage.clear()

      // Clear sessionStorage
      sessionStorage.clear()

      // Clear caches
      if ('caches' in window) {
        const cacheKeys = await caches.keys()
        await Promise.all(
          cacheKeys.map(key => caches.delete(key))
        )
      }

      // Unregister service workers
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations()
        await Promise.all(
          registrations.map(registration => registration.unregister())
        )
      }

      // Show success message
      toast.success("Cache Cleared", {
        description: "Reloading page with fresh data..."
      })

      // Hard reload the page
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error('Error clearing cache:', error)
      toast.error("Error", {
        description: "Failed to clear cache. Please try again."
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* App Name */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              {t("app.name")}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-emerald-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Report Mistakes Button - Always visible */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://forms.gle/e7EE6zg1NF6b96R47', '_blank')}
              className="hidden sm:inline-flex bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md hover:shadow-lg transition-all border-0 px-4"
            >
              {t("header.reportMistakes")}
            </Button>

            {/* Language Toggle */}
            <div className="hidden sm:flex">
              <LanguageToggle />
            </div>

            {/* Other Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearCacheAndReload}
                className="text-muted-foreground hover:text-emerald-600"
                title={t("header.clearCache")}
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
              <PWAInstallButton />
            </div>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-sm font-medium transition-colors hover:text-emerald-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {/* Mobile Report Mistakes Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://forms.gle/e7EE6zg1NF6b96R47', '_blank')}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md hover:shadow-lg transition-all border-0"
            >
              {t("header.reportMistakes")}
            </Button>
            {/* Mobile Language Toggle */}
            <div className="mt-4">
              <LanguageToggle />
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  )
}
