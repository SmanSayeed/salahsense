"use client"

import { useEffect, useState } from "react"
import { TopicCard } from "@/components/topics/topic-card"
import { useDebounce } from "@/hooks/use-debounce"
import { type Topic } from "@/types"

interface SearchResultsProps {
  query: string
  category?: string
}

export function SearchResults({ query, category }: SearchResultsProps) {
  const [results, setResults] = useState<Topic[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        const response = await fetch("/data.json")
        const data = await response.json()
        
        const filtered = data.filter((topic: Topic) => {
          const matchesQuery = !debouncedQuery || 
            topic.topic.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            topic.bangla.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            topic.english.toLowerCase().includes(debouncedQuery.toLowerCase())
          
          const matchesCategory = !category || topic.category === category
          
          return matchesQuery && matchesCategory
        })
        
        setResults(filtered)
      } catch (error) {
        console.error("Error fetching search results:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [debouncedQuery, category])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (results.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No results found. Try adjusting your search.
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {results.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  )
} 