"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  Play,
  Pause,
  Copy,
  Share,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { toggleBookmark } from "@/store/slices/bookmarkSlice"
import { getTopicById, loadTopics } from "@/lib/data-loader"
import { useTranslation } from "react-i18next"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import type { Topic, AudioState } from "@/types"

interface TopicDetailPageProps {
  topicId: number
}

export function TopicDetailPage({ topicId }: TopicDetailPageProps) {
  const { t, i18n } = useTranslation()
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const bookmarks = useAppSelector((state) => state.bookmarks.items)

  const [topic, setTopic] = useState<Topic | null>(null)
  const [allTopics, setAllTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    playbackRate: 1,
  })

  const audioRef = useRef<HTMLAudioElement>(null)
  const isBookmarked = bookmarks.includes(topicId)

  useEffect(() => {
    const loadTopicData = async () => {
      try {
        setLoading(true)
        const [topicData, topics] = await Promise.all([getTopicById(topicId), loadTopics()])

        if (!topicData) {
          setError("Topic not found")
          return
        }

        setTopic(topicData)
        setAllTopics(topics)
      } catch (err) {
        setError("Failed to load topic")
        console.error("Error loading topic:", err)
      } finally {
        setLoading(false)
      }
    }

    loadTopicData()
  }, [topicId])

  const handlePlayPause = () => {
    if (!audioRef.current || !topic?.audio) return

    if (audioState.isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }

  const handleAudioTimeUpdate = () => {
    if (!audioRef.current) return

    setAudioState((prev) => ({
      ...prev,
      currentTime: audioRef.current!.currentTime,
      duration: audioRef.current!.duration || 0,
    }))
  }

  const handleAudioPlay = () => {
    setAudioState((prev) => ({ ...prev, isPlaying: true }))
  }

  const handleAudioPause = () => {
    setAudioState((prev) => ({ ...prev, isPlaying: false }))
  }

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = value[0]
  }

  const handlePlaybackRateChange = (rate: number) => {
    if (!audioRef.current) return
    audioRef.current.playbackRate = rate
    setAudioState((prev) => ({ ...prev, playbackRate: rate }))
  }

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: t("topic.copied"),
        description: `${type} text copied to clipboard`,
      })
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleShare = async () => {
    if (navigator.share && topic) {
      try {
        await navigator.share({
          title: i18n.language === "en" ? topic.topic_english : topic.topic_bangla,
          text: topic.bangla,
          url: window.location.href,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      handleCopy(window.location.href, "Link")
    }
  }

  const handleBookmark = () => {
    dispatch(toggleBookmark(topicId))
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked ? "Topic removed from bookmarks" : "Topic added to bookmarks",
    })
  }

  const getAdjacentTopics = () => {
    if (!topic || allTopics.length === 0) return { prev: null, next: null }

    const categoryTopics = allTopics.filter((t) => t.category === topic.category)
    const currentIndex = categoryTopics.findIndex((t) => t.id === topicId)

    return {
      prev: currentIndex > 0 ? categoryTopics[currentIndex - 1] : null,
      next: currentIndex < categoryTopics.length - 1 ? categoryTopics[currentIndex + 1] : null,
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const renderHTML = (html: string) => {
    return { __html: html }
  }

  const getTopicTitle = () => {
    return i18n.language === "en" ? topic?.topic_english : topic?.topic_bangla
  }

  const getTranslation = () => {
    return i18n.language === "en" ? topic?.english : topic?.bangla
  }

  const getDetails = () => {
    return i18n.language === "en" ? topic?.details_in_english : topic?.details_in_bangla
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error || !topic) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-muted-foreground">{error || "Topic not found"}</p>
          <Link href="/">
            <Button className="mt-4">Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const { prev, next } = getAdjacentTopics()
  const breadcrumbItems = [
    { label: topic.category, href: `/category/${encodeURIComponent(topic.category)}` },
    { label: getTopicTitle() },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumbs items={breadcrumbItems} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        {/* Topic Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{getTopicTitle()}</h1>
        </div>

        {/* Main Content Card */}
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Arabic Text */}
            <div className="text-center">
              <p className="text-3xl font-arabic text-emerald-700 leading-loose">{topic.arabic}</p>
            </div>

            {/* Translation */}
            <div className="text-center">
              <p className="text-lg text-muted-foreground">{getTranslation()}</p>
            </div>

            {/* Audio Player */}
            {topic.audio && (
              <div className="space-y-4">
                {/* Audio Controls */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePlayPause}
                    className="h-10 w-10"
                  >
                    {audioState.isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>

                  <div className="flex-1 mx-4">
                    <Slider
                      value={[audioState.currentTime]}
                      max={audioState.duration}
                      step={0.1}
                      onValueChange={handleSeek}
                      className="w-full"
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handlePlaybackRateChange(0.5)}>
                        {t("audio.slow")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePlaybackRateChange(1)}>
                        {t("audio.normal")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePlaybackRateChange(1.5)}>
                        {t("audio.fast")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Time Display */}
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime(audioState.currentTime)}</span>
                  <span>{formatTime(audioState.duration)}</span>
                </div>

                <audio
                  ref={audioRef}
                  src={topic.audio}
                  onTimeUpdate={handleAudioTimeUpdate}
                  onPlay={handleAudioPlay}
                  onPause={handleAudioPause}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button variant="outline" onClick={() => handleCopy(topic.arabic, "Arabic")}>
                <Copy className="h-4 w-4 mr-2" />
                {t("topic.copyArabic")}
              </Button>
              <Button variant="outline" onClick={() => handleCopy(getTranslation() || "", i18n.language === "en" ? "English" : "Bangla")}>
                <Copy className="h-4 w-4 mr-2" />
                {i18n.language === "en" ? t("topic.copyEnglish") : t("topic.copyBangla")}
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share className="h-4 w-4 mr-2" />
                {t("topic.share")}
              </Button>
              <Button variant="outline" onClick={handleBookmark}>
                {isBookmarked ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 mr-2" />
                    {t("topic.bookmarked")}
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4 mr-2" />
                    {t("topic.bookmark")}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Details Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t("topic.details")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-emerald max-w-none"
              dangerouslySetInnerHTML={renderHTML(getDetails() || "")}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          {prev ? (
            <Link href={`/topic/${prev.id}`}>
              <Button variant="outline">
                <ChevronLeft className="h-4 w-4 mr-2" />
                {t("topic.previous")}
              </Button>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link href={`/topic/${next.id}`}>
              <Button variant="outline">
                {t("topic.next")}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </motion.div>
    </div>
  )
}
