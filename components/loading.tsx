import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingProps {
  className?: string
  size?: "default" | "sm" | "lg"
}

const sizeClasses = {
  default: "h-8 w-8",
  sm: "h-4 w-4",
  lg: "h-12 w-12",
}

export function Loading({ className, size = "default" }: LoadingProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2
        className={cn("animate-spin text-muted-foreground", sizeClasses[size])}
      />
    </div>
  )
} 