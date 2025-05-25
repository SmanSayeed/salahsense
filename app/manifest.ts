import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Islamic Prayer Hub - ইসলামিক প্রার্থনা হাব",
    short_name: "Prayer Hub",
    description: "Complete Islamic prayer guide with Takbir, Duas, and Kalams",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#059669",
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any",
      },
    ],
    categories: ["education", "lifestyle", "religion"],
    lang: "bn",
    dir: "ltr",
  }
}
