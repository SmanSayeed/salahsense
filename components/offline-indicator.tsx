"use client"

import { useEffect, useState } from "react"
import { WifiOff } from "lucide-react"
import { cn } from "@/lib/utils"

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Check initial state
    setIsOffline(!navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-destructive px-4 py-2 text-sm text-white shadow-lg",
        "animate-in slide-in-from-left-2"
      )}
    >
      <WifiOff className="h-4 w-4" />
      <span>You are offline</span>
    </div>
  )
} 