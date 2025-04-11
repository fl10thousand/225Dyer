"use client"

import { useState } from "react"
import { Twitter, Facebook, Linkedin, Copy, Check } from "lucide-react"

interface SocialShareButtonsProps {
  title: string
  className?: string
}

export function SocialShareButtons({ title, className }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  // Only run on client side
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  // Format the share text
  const shareText = `Check out "${title}" on DayTrips.ai! 🚗✨`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className={`flex items-center space-x-3 ${className || ""}`}>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1DA1F2] text-white hover:bg-opacity-90 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1877F2] text-white hover:bg-opacity-90 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0A66C2] text-white hover:bg-opacity-90 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>

      <button
        onClick={copyToClipboard}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Copy link to clipboard"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </button>

      {copied && <span className="text-sm text-green-600 dark:text-green-400">Copied!</span>}
    </div>
  )
}
