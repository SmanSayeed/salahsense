"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "@/store/store"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nextProvider } from "react-i18next"
import i18n from "@/lib/i18n"
import { useEffect } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register service worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registration successful:', registration.scope)
        })
        .catch((err) => {
          console.error('Service Worker registration failed:', err)
        })
    }
  }, [])

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  )
}
