"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

interface FallbackImageProps {
  src: string | null | undefined
  alt: string
  fallbackSrc: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  loadDynamically?: boolean
  websiteUrl?: string // Add this line
}

export default function FallbackImage({
  src,
  alt,
  fallbackSrc,
  className,
  width = 400,
  height = 300,
  fill = false,
  priority = false,
  loadDynamically = false,
  websiteUrl,
}: FallbackImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src || fallbackSrc)
  const [isLoading, setIsLoading] = useState(true)
  const [triedLogo, setTriedLogo] = useState(false)

  // Function to get a website's favicon
  const getFavicon = useCallback(async (url: string): Promise<string | null> => {
    try {
      if (!url) return null

      // Extract the domain from the URL
      let domain = url
      try {
        const urlObj = new URL(url)
        domain = urlObj.hostname
      } catch (e) {
        // If URL parsing fails, try to extract domain manually
        domain = url.replace(/^https?:\/\//, "").split("/")[0]
      }

      // Use Google's favicon service
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    } catch (error) {
      console.error("Error getting favicon:", error)
      return null
    }
  }, [])

  useEffect(() => {
    if (src) {
      setImageSrc(src)
      setIsLoading(true)
      setTriedLogo(false)
    }
  }, [src])

  const handleError = async () => {
    // If we haven't tried getting the logo yet and we have a website URL
    if (!triedLogo && websiteUrl) {
      setTriedLogo(true)
      const logoUrl = await getFavicon(websiteUrl)
      if (logoUrl) {
        setImageSrc(logoUrl)
        return
      }
    }

    // If we've already tried the logo or couldn't get one, use the fallback
    setImageSrc(fallbackSrc)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <>
      {fill ? (
        <Image
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            aspectRatio: "1/1",
          }}
          src={imageSrc || fallbackSrc}
          alt={alt}
          className={className}
          onError={handleError}
          onLoad={handleLoad}
          priority={priority}
        />
      ) : (
        <Image
          width={width}
          height={height}
          src={imageSrc || fallbackSrc}
          alt={alt}
          className={className}
          style={{
            aspectRatio: "1/1",
            objectFit: "cover",
            objectPosition: "center",
          }}
          onError={handleError}
          onLoad={handleLoad}
          priority={priority}
        />
      )}
    </>
  )
}
