import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const post = {
    slug: "save-on-caribbean-cruise-excursions",
    title: "How to Save on Excursions When Cruising in the Caribbean",
    excerpt:
      "Learn how to save up to 60% on Caribbean cruise excursions by using Viator and DayTrips.ai. Plan smarter, skip the cruise line markups, and get the most from your ports of call.",
    date: "April 20, 2025",
    author: "Emma Roberts",
    tags: ["Caribbean", "Cruise", "Travel Tips", "Budget Travel", "Excursions", "Viator"],
  }

  // Use the cruise port image
  const imageUrl = "/images/caribbean-cruise-port.png"

  return {
    title: `${post.title} | DayTrips.ai Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://daytrips.ai/blog/save-on-caribbean-cruise-excursions`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Aerial view of cruise ships docked at a Caribbean port with turquoise waters",
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
