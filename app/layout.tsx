import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Noto_Serif_Bengali, Amiri } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { Toaster } from "sonner"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-serif-bengali",
  display: "swap",
})

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Islamic Prayer Hub - ইসলামিক প্রার্থনা হাব",
  description: "Complete Islamic prayer guide with Takbir, Duas, and Kalams in Arabic, Bangla, and English",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Islamic Prayer Hub",
  },
  icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-192x192.png",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={cn(
        inter.variable,
        notoSerifBengali.variable,
        amiri.variable,
        "antialiased"
      )}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#059669" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans",
          "selection:bg-primary selection:text-primary-foreground"
        )}
        suppressHydrationWarning
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <div className="container mx-auto px-4 py-8">{children}</div>
            </main>
            <Footer />
          </div>
          <PWAInstallPrompt />
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  )
}
