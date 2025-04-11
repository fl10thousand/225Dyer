import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const post = {
    slug: "seattle-ballooning-family-adventure",
    title: "DayTrip.ai Spotlight: Soaring High with Seattle Ballooning – A Family-Owned Adventure Like No Other",
    excerpt:
      "Discover Seattle Ballooning, a family-owned hot air balloon adventure company offering breathtaking views of Mount Rainier and the Pacific Northwest landscape.",
    date: "April 15, 2025",
    author: "Emma Roberts",
    tags: ["Seattle", "Hot Air Balloon", "Adventure", "Family Business", "Pacific Northwest"],
  }

  // Use the hot air balloon image
  const imageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d5c959c8e8ad24ed5c02c59c7d9aba1f.JPEG-cl6kmH7cfIgg24Q5m6KQ9vfL8KOLDd.jpeg"

  return {
    title: `${post.title} | DayTrips.ai Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://daytrips.ai/blog/seattle-ballooning-family-adventure`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Colorful hot air balloon flying over lush green forest with mountains and golden sunset sky",
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
