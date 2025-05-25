"use client"

import { ThemeProvider } from "@/components/providers/theme-provider"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/store"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="islamic-prayer-theme"
      >
        {children}
      </ThemeProvider>
    </ReduxProvider>
  )
} 