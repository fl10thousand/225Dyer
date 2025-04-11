import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const post = {
    slug: "perfect-one-day-itinerary-newport-rhode-island",
    title: "The Perfect One-Day Itinerary for Newport, Rhode Island",
    excerpt:
      "Discover the best of Newport, Rhode Island in just one day with this curated itinerary featuring historic mansions, coastal walks, sailing adventures, and world-class dining.",
    date: "March 20, 2025",
    author: "Emma Roberts",
    tags: ["Newport", "Rhode Island", "Day Trips", "Travel Guide", "Coastal Getaway"],
  }

  // Use the Newport harbor image
  const imageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trip%20in%20newport%20RI.jpg-X0PnKENg7haB3QqwBIgjl7U7GPF5r7.jpeg"

  return {
    title: `${post.title} | DayTrips.ai Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://daytrips.ai/blog/perfect-one-day-itinerary-newport-rhode-island`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Sunset view of Newport harbor with sailboats and a silhouette statue",
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
