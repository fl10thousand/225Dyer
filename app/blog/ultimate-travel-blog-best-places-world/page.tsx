import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, MapPin } from "lucide-react"
import { getBlogPostBySlug } from "@/lib/blog-service"
import ViatorBanner from "@/components/viator-banner"
import { SocialShareButtons } from "@/components/social-share-buttons"
import { notFound } from "next/navigation"

export default function BlogPostPage() {
  const post = getBlogPostBySlug("ultimate-travel-blog-best-places-world")

  if (!post) {
    notFound()
  }

  // Function to sanitize HTML content
  function sanitizeHtmlContent(content: string): string {
    // Remove any potential full HTML document structure
    let sanitized = content

    // Remove doctype if present
    sanitized = sanitized.replace(/<!DOCTYPE[^>]*>/i, "")

    // Remove html, head, and body tags if present
    sanitized = sanitized.replace(/<html[^>]*>|<\/html>/gi, "")
    sanitized = sanitized.replace(/<head[^>]*>.*?<\/head>/gis, "")
    sanitized = sanitized.replace(/<body[^>]*>|<\/body>/gi, "")

    return sanitized.trim()
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/50 py-12 md:py-24">
      <div className="container max-w-[calc(4xl-140px)] mx-auto px-4 sm:px-6 xl:pr-36">
        {/* Add the ViatorBanner component here */}
        <div className="relative">
          <div className="fixed top-36 right-4 z-10 hidden xl:block">
            <ViatorBanner />
          </div>
        </div>

        <Button variant="ghost" asChild className="mb-8 group">
          <Link href="/blog" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </Button>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readingTime} min read
              </span>
              {post.location && (
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {post.location}
                </span>
              )}
            </div>

            {/* Add social share buttons below the post metadata */}
            <div className="mt-4">
              <SocialShareButtons title={post.title} />
            </div>
          </div>

          <div className="relative h-[400px] w-full mb-10 rounded-xl overflow-hidden">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/daytripsai-4ruGmsmxw3kSirVDIT5jXjGzVQUIaj.png"
              alt="Collage of global travel destinations including Amalfi Coast, Kyoto, Reykjavik, and Marrakech"
              className="object-cover w-full h-full"
            />
          </div>

          <div>
            {/* Special promo banner for this travel blog */}
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300">Exclusive Travel Deals</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Find the best tours and activities for your next adventure with Viator
                </p>
              </div>
              <a
                href="https://www.viator.com?pid=P00244457&mcid=56757&medium=affiliate"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 inline-flex items-center"
                style={{ color: "white" }}
              >
                Explore Deals
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(post.content) }}
              className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:text-foreground prose-headings:font-bold 
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 
                prose-p:text-base prose-p:leading-relaxed prose-p:mb-6 prose-p:text-muted-foreground 
                prose-strong:font-semibold prose-strong:text-foreground 
                prose-a:text-primary hover:prose-a:text-primary/80 prose-a:transition-colors 
                prose-ul:my-6 prose-ul:pl-6 
                prose-li:text-muted-foreground prose-li:my-2 prose-li:leading-relaxed
                prose-img:rounded-lg prose-img:shadow-md
                [&>p]:text-[17px] [&>p]:leading-[1.8]
                [&>ul]:list-disc [&>ul]:space-y-2
                [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6
                [&>h3]:text-[20px] [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-4
                [&_strong]:text-foreground [&_strong]:font-semibold"
            />
          </div>

          {/* Viator CTA Button */}
          <div className="my-10 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">Book Your Next Adventure</h3>
                <p className="text-blue-700 dark:text-blue-400 max-w-md">
                  Explore thousands of tours and activities worldwide. Secure your spot and skip the lines!
                </p>
              </div>
              <a
                href="https://www.viator.com?pid=P00244457&mcid=56757&medium=affiliate"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Find Tours & Activities
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Written by</p>
              <p className="font-medium">{post.author}</p>
            </div>
            <div>
              {/* Add social share buttons at the bottom of the article */}
              <SocialShareButtons title={post.title} />
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
