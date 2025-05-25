"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useTranslation } from "react-i18next"

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Check if already installed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    if (isStandalone) {
      setIsInstallable(false)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setIsInstallable(false)
      }
    } catch (error) {
      console.error("Error installing PWA:", error)
    }
  }

  if (!isInstallable) return null

  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed bottom-4 right-4 z-50 gap-2 shadow-lg"
      onClick={handleInstallClick}
    >
      <Download className="h-4 w-4" />
      {t("Install App")}
    </Button>
  )
}
