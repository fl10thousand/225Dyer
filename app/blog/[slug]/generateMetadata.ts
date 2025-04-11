import { getBlogPostBySlug } from "@/lib/blog-service"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | DayTrips.ai Blog",
      description: "The blog post you're looking for doesn't exist or may have been moved.",
    }
  }

  // Determine the image URL based on the slug
  let imageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20tokyo.jpg-4jMdvakRCmuaHAEmXH6Dc7LckDBwlC.jpeg"

  if (params.slug === "hidden-gems-of-hawaii") {
    imageUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20hawaii.jpg-z5e9JNMDaPoY05XspOf6BRIZJeucWB.jpeg"
  } else if (params.slug === "perfect-day-in-paris") {
    imageUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20paris.jpg-u4O45icSj7XCwXKMFcOYKYA4uXvSOa.jpeg"
  } else if (params.slug === "budget-friendly-barcelona") {
    imageUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20Barcelona.jpg-3gZzXKoieCE3tzg5eSgkwF6MJ9xW1k.jpeg"
  } else if (params.slug === "family-friendly-day-trips-london") {
    imageUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20London.jpg-zEmNVF8facXbeWa2w16TUQAXYJWKJq.jpeg"
  } else if (params.slug === "seasonal-day-trips-new-york") {
    imageUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Day%20trips%20in%20new%20york%20city.jpg-UvAxIfDasJdreX7hYgCuz7u0jVpya5.jpeg"
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
      url: `https://daytrips.ai/blog/${params.slug}`,
      images: [
        {
          url: imageUrl,
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
      images: [imageUrl],
    },
  }
}
