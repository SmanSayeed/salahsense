import type { Topic, Category } from "@/types"

const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours
const DATA_VERSION = "1.0.0"

interface CacheData<T> {
  data: T
  timestamp: number
  version: string
}

function getCachedData<T>(key: string): T | null {
  if (typeof window === "undefined") return null
  
  try {
    const cached = localStorage.getItem(key)
    if (!cached) return null

    const parsedCache: CacheData<T> = JSON.parse(cached)
    
    // Check if cache is valid
    const isExpired = Date.now() - parsedCache.timestamp > CACHE_DURATION
    const isOldVersion = parsedCache.version !== DATA_VERSION
    
    if (isExpired || isOldVersion) {
      localStorage.removeItem(key)
      return null
    }
    
    return parsedCache.data
  } catch (error) {
    console.error("Error reading cache:", error)
    localStorage.removeItem(key)
    return null
  }
}

function setCachedData<T>(key: string, data: T): void {
  if (typeof window === "undefined") return
  
  const cacheData: CacheData<T> = {
    data,
    timestamp: Date.now(),
    version: DATA_VERSION
  }
  
  try {
    localStorage.setItem(key, JSON.stringify(cacheData))
  } catch (error) {
    console.error("Error setting cache:", error)
  }
}

export async function loadTopics(): Promise<Topic[]> {
  const cacheKey = "islamic-prayer-topics"

  // Try to get from cache first
  const cached = getCachedData<Topic[]>(cacheKey)
  if (cached && Array.isArray(cached)) {
    return cached
  }

  try {
    const response = await fetch("/data.json")
    if (!response.ok) {
      throw new Error("Failed to fetch topics")
    }

    const data = await response.json()
    const topics: Topic[] = Array.isArray(data) ? data : []

    // Cache the data
    setCachedData(cacheKey, topics)

    return topics
  } catch (error) {
    console.error("Error loading topics:", error)
    return []
  }
}

export async function loadCategories(): Promise<Category[]> {
  const cacheKey = "islamic-prayer-categories"

  // Try to get from cache first
  const cached = getCachedData<Category[]>(cacheKey)
  if (cached && Array.isArray(cached)) {
    return cached
  }

  try {
    const response = await fetch("/categories.json")
    if (!response.ok) {
      throw new Error("Failed to fetch categories")
    }

    const data = await response.json()
    const categories: Category[] = Array.isArray(data) ? data : []

    // Cache the data
    setCachedData(cacheKey, categories)

    return categories
  } catch (error) {
    console.error("Error loading categories:", error)
    return []
  }
}

export async function getTopicById(id: number): Promise<Topic | null> {
  const topics = await loadTopics()
  return topics.find((topic) => topic.id === id) || null
}

export async function getTopicsByCategory(categoryId: number): Promise<Topic[]> {
  const topics = await loadTopics()
  return topics.filter((topic) => topic.category_id === categoryId)
}

export async function getFeaturedTopics(): Promise<Topic[]> {
  const topics = await loadTopics()
  return topics.filter((topic) => topic.featured)
}

export async function searchTopics(query: string, categoryId?: number): Promise<Topic[]> {
  const topics = await loadTopics()
  return topics.filter((topic) => {
    const matchesQuery = !query || 
      topic.topic_bangla.toLowerCase().includes(query.toLowerCase()) ||
      topic.topic_english.toLowerCase().includes(query.toLowerCase()) ||
      topic.bangla.toLowerCase().includes(query.toLowerCase()) ||
      topic.english.toLowerCase().includes(query.toLowerCase())
    
    const matchesCategory = !categoryId || topic.category_id === categoryId
    
    return matchesQuery && matchesCategory
  })
}
