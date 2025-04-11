import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const post = {
    slug: "santa-cruz-day-trip-from-san-francisco",
    title: "Santa Cruz Day Trip from San Francisco: Redwoods, Surf, and Boardwalk Fun",
    excerpt:
      "Discover the ultimate Santa Cruz day trip from San Francisco or Silicon Valley. Explore redwoods, beaches, and the iconic boardwalk. Book unforgettable experiences via Viator.",
    date: "March 28, 2025",
    author: "Emma Roberts",
    tags: ["Santa Cruz", "San Francisco", "Day Trips", "California", "Boardwalk", "Redwoods"],
  }

  // Use the Santa Cruz boardwalk image
  const imageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20santa%20Cruz.jpg-QhweU7UuAUefrHHpN8DhfGCZMrWzNB.jpeg"

  return {
    title: `${post.title} | DayTrips.ai Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://daytrips.ai/blog/santa-cruz-day-trip-from-san-francisco`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Sunset view of the Santa Cruz Beach Boardwalk with sky lift silhouetted against the golden sky",
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
