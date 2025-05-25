"use client"

import { useState, useEffect } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
    appinstalled: Event
  }
}

export function PWAInstallButton() {
  const { t } = useTranslation()
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        setIsInstallable(false)
        setDeferredPrompt(null)
      }
    } catch (error) {
      console.error('Error installing PWA:', error)
    }
  }

  if (!isInstallable || isInstalled) return null

  return (
    <Button 
      variant="default" 
      size="sm" 
      onClick={handleInstallClick} 
      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
    >
      <Download className="h-4 w-4" />
      {t("pwa.install")}
    </Button>
  )
}
