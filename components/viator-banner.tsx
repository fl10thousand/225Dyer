"use client"

import { useEffect } from "react"

export default function ViatorBanner({ className = "" }: { className?: string }) {
  useEffect(() => {
    // Create and append the script element
    const script = document.createElement("script")
    script.src = "https://partners.vtrcdn.com/static/scripts/banners/banners.js"
    script.async = true
    document.body.appendChild(script)

    // Clean up function to remove the script when component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div
      data-id="viator-banner"
      data-partner-id="P00244457"
      data-url="https://www.viator.com/"
      data-banner-width="120"
      data-banner-height="600"
      data-banner-language="en"
      data-banner-selection="banner1"
      className={className}
    ></div>
  )
}
