"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { type Topic } from "@/types"

interface TopicCardProps {
  topic: Topic
}

const truncateText = (text: string, maxLength: number = 100) => {
  if (!text) return ""
  return text.length > maxLength ? text.slice(0, maxLength).trim() + "..." : text
}

export function TopicCard({ topic }: TopicCardProps) {
  const { t, i18n } = useTranslation()
  const currentLocale = i18n.language

  const details = currentLocale === "bn" 
    ? truncateText(topic.details_in_bangla)
    : truncateText(topic.details_in_english)

  return (
    <Link href={`/topics/${topic.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className="h-[32rem] overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48">
              <Image
                src={topic.thumbnail}
                alt={topic.topic}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </CardHeader>
          <CardContent className="flex h-[calc(32rem-12rem)] flex-col p-4">
            <div className="space-y-2 flex-grow">
              <h3 className="line-clamp-2 text-lg font-semibold">
                {currentLocale === "bn" ? topic.bangla : topic.english}
              </h3>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {details}
              </p>
            </div>
            {topic.featured && (
              <div className="mt-auto pt-2">
                <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  {t("featured")}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
} 