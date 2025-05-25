/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope

// Cache names
const CACHE_NAME = "islamic-prayer-hub-v1"
const RUNTIME_CACHE = "runtime-cache"

const PRECACHE_URLS = [
  "/",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-384x384.png",
  "/icon-512x512.png",
]

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  )
})

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  )
})

// Fetch event
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(event.request).then((response) => {
          return response || caches.match("/").then((response) => response || new Response(""))
        })
      )
    )
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          const responseToCache = response.clone()
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          if (event.request.destination === "image") {
            return new Response()
          }
          throw new Error("Network error")
        })
    })
  )
})

export {} 