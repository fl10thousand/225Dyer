import { getBlogPostBySlug } from "@/lib/blog-service"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const post = getBlogPostBySlug("ultimate-travel-blog-best-places-world")

  if (!post) {
    return {
      title: "Post Not Found | DayTrips.ai Blog",
      description: "The blog post you're looking for doesn't exist or may have been moved.",
    }
  }

  return {
    title: `${post.title} | DayTrips.ai Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://daytrips.ai/blog/ultimate-travel-blog-best-places-world`,
      images: [
        {
          url:
            post.coverImage ||
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/global-travel-destinations.jpg-QhweU7UuAUefrHHpN8DhfGCZMrWzNB.jpeg",
          width: 1200,
          height: 630,
          alt: post.title,
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
      images: [
        post.coverImage ||
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/global-travel-destinations.jpg-QhweU7UuAUefrHHpN8DhfGCZMrWzNB.jpeg",
      ],
    },
  }
}
