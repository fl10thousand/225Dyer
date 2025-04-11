"use client"

import { useState, useEffect } from "react"
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
}: FallbackImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src || fallbackSrc)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (src) {
      setImageSrc(src)
      setIsLoading(true) // Reset loading state when src changes
    }
  }, [src])

  const handleError = () => {
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
          style={{ objectFit: "cover", objectPosition: "center" }}
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
          onError={handleError}
          onLoad={handleLoad}
          priority={priority}
        />
      )}
    </>
  )
}
