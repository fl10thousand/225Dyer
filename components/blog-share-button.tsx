"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

export default function BlogShareButton() {
  return (
    <Button variant="outline" size="sm" className="flex items-center gap-1.5">
      <Share2 className="h-4 w-4" />
      Share
    </Button>
  )
}
