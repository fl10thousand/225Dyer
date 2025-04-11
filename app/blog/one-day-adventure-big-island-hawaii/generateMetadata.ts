import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const post = {
    slug: "one-day-adventure-big-island-hawaii",
    title: "One Day Adventure Around the Big Island: The Ultimate Hawaii Itinerary",
    excerpt:
      "Experience the best of Hawaii's Big Island in just one day with our comprehensive itinerary covering beaches, waterfalls, volcanoes, and local cuisine from sunrise to sunset.",
    date: "April 10, 2025",
    author: "Emma Roberts",
    tags: ["Hawaii", "Big Island", "Day Trips", "Travel Guide", "Volcanoes"],
  }

  // Use the Hawaii road image
  const imageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20Ki%CC%84lauea.jpg-ZoWUCmsN97R7D4efH5zujIKwQo9d0Z.jpeg"

  return {
    title: `${post.title} | DayTrips.ai Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://daytrips.ai/blog/one-day-adventure-big-island-hawaii`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Scenic road on the Big Island of Hawaii with mountains and lush greenery",
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
