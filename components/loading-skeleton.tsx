"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="text-center space-y-4">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="h-8 bg-muted rounded-lg w-64 mx-auto"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
          className="h-4 bg-muted rounded w-96 mx-auto"
        />
      </div>

      {/* Cards skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-3">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
                className="h-32 bg-muted rounded"
              />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 + 0.3 }}
                className="h-4 bg-muted rounded w-3/4"
              />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 + 0.5 }}
                className="h-3 bg-muted rounded w-1/2"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
