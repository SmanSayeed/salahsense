export interface Topic {
  id: number
  category_id: number
  category: string
  topic_bangla: string
  topic_english: string
  arabic: string
  audio: string
  bangla: string
  english: string
  details_in_bangla: string
  details_in_english: string
  featured: boolean
  thumbnail: string
}

export interface Category {
  id: number
  bangla_category: string
  english_category: string
}

export interface AudioState {
  isPlaying: boolean
  currentTime: number
  duration: number
  speed: number
}

export interface SearchFilters {
  query: string
  category_id?: number
  page: number
}

export interface Bookmark {
  id: number
  addedAt: string
}
