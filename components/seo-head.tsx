"use client"

import { usePathname } from "next/navigation"
import Head from "next/head"

interface SeoHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  ogImageAlt?: string
  canonical?: string
}

export default function SeoHead({
  title = "DayTrips.ai – AI-Powered Day Trip Generator",
  description = "Let our AI plan your perfect day trip, anywhere in the world. Discover adventures, book experiences, and travel smarter.",
  keywords = ["day trips", "AI trip planner", "travel deals", "viator", "hotel booking", "car rentals"],
  ogImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20hero.jpg-BIpmYZa6Uo98TCI6TSUymVlwAreFDV.jpeg",
  ogImageAlt = "Road with map on dashboard – AI Day Trip Generator background",
  canonical,
}: SeoHeadProps) {
  const pathname = usePathname()
  const siteUrl = "https://daytrips.ai"
  const canonicalUrl = canonical || `${siteUrl}${pathname}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:site_name" content="DayTrips.ai" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@daytripsai" />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="author" content="DayTrips.ai" />
    </Head>
  )
}
