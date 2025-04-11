import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const post = {
    slug: "perfect-day-trip-savannah-georgia",
    title: "A Perfect Day Trip to Savannah, Georgia: History, Charm & Southern Flavor",
    excerpt:
      "Discover the ultimate day trip to Savannah, Georgia with our guide to historic sites, charming streets, and Southern cuisine. Plan your perfect Savannah adventure today!",
    date: "April 5, 2025",
    author: "Emma Roberts",
    tags: ["Savannah", "Georgia", "Day Trips", "Travel Guide", "Southern Charm"],
  }

  // Use the Savannah riverfront image
  const imageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20Savannah%2C%20Georgia.jpg-jSxYPdQ3SFuixitoi59E2DHmlvgaoI.jpeg"

  return {
    title: `${post.title} | DayTrips.ai Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://daytrips.ai/blog/perfect-day-trip-savannah-georgia`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Sunset view of Savannah's riverfront with the Georgia Queen riverboat and historic buildings",
        },
      ],
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  }
}
