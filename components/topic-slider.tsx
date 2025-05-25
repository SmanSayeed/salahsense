"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TopicCard } from "@/components/topic-card"
import type { Topic } from "@/types"

interface TopicSliderProps {
  topics: Topic[]
  title?: string
}

export function TopicSlider({ topics, title }: TopicSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    large: 4,
  }

  const nextSlide = () => {
    const maxIndex = Math.max(0, topics.length - itemsPerView.mobile)
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  if (topics.length === 0) return null

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">{title}</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={prevSlide} disabled={currentIndex === 0}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex >= topics.length - itemsPerView.mobile}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="relative overflow-hidden">
        <motion.div
          ref={sliderRef}
          className="flex gap-4"
          animate={{ x: -currentIndex * (100 / itemsPerView.mobile) + "%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {topics.map((topic) => (
            <div key={topic.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
              <TopicCard topic={topic} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile swipe indicators */}
      <div className="flex justify-center space-x-2 sm:hidden">
        {Array.from({ length: Math.ceil(topics.length / itemsPerView.mobile) }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-emerald-600" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
