import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const post = {
    slug: "how-to-explore-dubai-on-a-budget",
    title: "How to Explore Dubai on a Budget: The Ultimate One-Day Itinerary",
    excerpt:
      "Discover how to experience Dubai's top attractions, stunning views, and cultural gems without breaking the bank with our budget-friendly one-day itinerary.",
    date: "March 25, 2025",
    author: "Emma Roberts",
    tags: ["Dubai", "Budget Travel", "Day Trips", "Travel Guide", "UAE"],
  }

  // Use the Dubai skyline image
  const imageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20to%20dubai.jpg-EuapD6qvpFOBr8yh98dGuYTWDT0hgc.jpeg"

  return {
    title: `${post.title} | DayTrips.ai Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://daytrips.ai/blog/how-to-explore-dubai-on-a-budget`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Dubai skyline at night with illuminated skyscrapers and a purple-lit bridge",
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
