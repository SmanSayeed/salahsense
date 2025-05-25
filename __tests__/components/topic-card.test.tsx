import { render, screen } from "@testing-library/react"
import { TopicCard } from "@/components/topics/topic-card"

const mockTopic = {
  id: 1,
  category: "Test Category",
  topic: "Test Topic",
  arabic: "Test Arabic",
  audio: "https://example.com/audio.mp3",
  bangla: "টেস্ট বাংলা",
  english: "Test English",
  details_in_bangla: "টেস্ট বিস্তারিত বাংলা".repeat(50),
  details_in_english: "Test details in English".repeat(50),
  featured: true,
  thumbnail: "https://example.com/image.jpg",
}

describe("TopicCard", () => {
  it("renders topic card with truncated content", () => {
    render(<TopicCard topic={mockTopic} />)
    
    // Check if title is rendered
    expect(screen.getByText("টেস্ট বাংলা")).toBeInTheDocument()
    
    // Check if details are truncated
    const details = screen.getByText(/টেস্ট বিস্তারিত বাংলা/)
    expect(details.textContent?.length).toBeLessThanOrEqual(203) // 200 chars + "..."
  })

  it("shows featured badge when topic is featured", () => {
    render(<TopicCard topic={mockTopic} />)
    expect(screen.getByText("featured")).toBeInTheDocument()
  })
}) 