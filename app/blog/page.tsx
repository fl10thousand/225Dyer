import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { getBlogPosts } from "@/lib/blog-service"
// Import the ViatorBanner component at the top of the file
import ViatorBanner from "@/components/viator-banner"

export const metadata = {
  title: "Travel Blog | DayTrips.ai",
  description: "Travel tips, destination guides, and day trip inspiration from DayTrips.ai for locations worldwide",
  keywords: ["travel blog", "day trip guides", "travel tips", "destination guides", "travel inspiration"],
  openGraph: {
    title: "Travel Blog | DayTrips.ai",
    description: "Travel tips, destination guides, and day trip inspiration from DayTrips.ai",
    url: "https://daytrips.ai/blog",
    type: "website",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20tokyo.jpg-4jMdvakRCmuaHAEmXH6Dc7LckDBwlC.jpeg",
        width: 1200,
        height: 630,
        alt: "DayTrips.ai Blog",
      },
    ],
  },
}

// Add the ViatorBanner component inside the main div, just after the opening container div
// Update the return statement to include the banner
export default function BlogPage() {
  // Get blog posts from our static service
  const posts = getBlogPosts()

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/50 py-12 md:py-24">
      <div className="container max-w-[calc(6xl-140px)] mx-auto px-4 sm:px-6 xl:pr-36">
        {/* Add the ViatorBanner component here */}
        <div className="relative">
          <div className="fixed top-36 right-4 z-10 hidden xl:block">
            <ViatorBanner />
          </div>
        </div>

        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">DayTrips.ai Blog</h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Travel tips, destination guides, and day trip inspiration to help you plan your next adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card
              key={post.slug}
              className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] group"
            >
              <div className="relative h-48 w-full overflow-hidden">
                {post.slug === "ultimate-travel-blog-best-places-world" ? (
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/daytripsai-4ruGmsmxw3kSirVDIT5jXjGzVQUIaj.png"
                    alt="Collage of global travel destinations including Amalfi Coast, Kyoto, Reykjavik, and Marrakech"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                ) : post.slug === "ultimate-day-trip-mystic-connecticut" ? (
                  <img
                    src="/images/mystic-connecticut.jpeg"
                    alt="Sunset view of white colonial houses along the Mystic River with perfect reflections in the calm water"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                ) : post.slug === "save-on-caribbean-cruise-excursions" ? (
                  <img
                    src="/images/caribbean-cruise-port.png"
                    alt="Aerial view of cruise ships docked at a Caribbean port with turquoise waters"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                ) : post.slug === "perfect-one-day-itinerary-newport-rhode-island" ? (
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trip%20in%20newport%20RI.jpg-X0PnKENg7haB3QqwBIgjl7U7GPF5r7.jpeg"
                    alt="Sunset view of Newport harbor with silhouette of statue"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                ) : post.slug === "seattle-ballooning-family-adventure" ? (
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d5c959c8e8ad24ed5c02c59c7d9aba1f.JPEG-cl6kmH7cfIgg24Q5m6KQ9vfL8KOLDd.jpeg"
                    alt="Colorful hot air balloon flying over lush green forest with mountains and golden sunset sky"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                ) : post.slug === "perfect-day-trip-savannah-georgia" ? (
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20Savannah%2C%20Georgia.jpg-jSxYPdQ3SFuixitoi59E2DHmlvgaoI.jpeg"
                    alt="Sunset view of Savannah's riverfront with the Georgia Queen riverboat and historic buildings"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                ) : post.slug === "plan-perfect-day-trip-with-ai" ? (
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20generator%20.jpg-TLMDwI7JIbj2Hcoir5DlQXLa0N6DA3.jpeg"
                    alt="Two women planning a trip using AI on a laptop"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                ) : post.slug === "hidden-gems-of-hawaii" ? (
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20hawaii.jpg-z5e9JNMDaPoY05XspOf6BRIZJeucWB.jpeg"
                    alt="Beautiful Hawaiian beach at sunset with palm trees and vibrant orange sky"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                ) : post.slug === "perfect-day-in-paris" ? (
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20paris.jpg-u4O45icSj7XCwXKMFcOYKYA4uXvSOa.jpeg"
                    alt="Sunset view of Paris with the Eiffel Tower and boats on the Seine River"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                ) : post.slug === "budget-friendly-barcelona" ? (
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20Barcelona.jpg-3gZzXKoieCE3tzg5eSgkwF6MJ9xW1k.jpeg"
                    alt="Temple of the Sacred Heart of Jesus on Mount Tibidabo in Barcelona"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                ) : post.slug === "family-friendly-day-trips-london" ? (
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20London.jpg-zEmNVF8facXbeWa2w16TUQAXYJWKJq.jpeg"
                    alt="Tower Bridge in London with its iconic blue suspension structure spanning the Thames River"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                ) : post.slug === "seasonal-day-trips-new-york" ? (
                  <img
                    src="/images/day-trips-nyc.jpeg"
                    alt="Times Square at night with Broadway show advertisements and bright neon lights"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                ) : post.slug === "how-to-explore-dubai-on-a-budget" ? (
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20to%20dubai.jpg-EuapD6qvpFOBr8yh98dGuYTWDT0hgc.jpeg"
                    alt="Dubai skyline at night with illuminated skyscrapers and a purple-lit bridge"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                ) : post.slug === "santa-cruz-day-trip-from-san-francisco" ? (
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20santa%20Cruz.jpg-QhweU7UuAUefrHHpN8DhfGCZMrWzNB.jpeg"
                    alt="Sunset view of the Santa Cruz Beach Boardwalk with sky lift silhouetted against the golden sky"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                ) : post.slug === "one-day-adventure-big-island-hawaii" ? (
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20Ki%CC%84lauea.jpg-ZoWUCmsN97R7D4efH5zujIKwQo9d0Z.jpeg"
                    alt="Scenic road on the Big Island of Hawaii with mountains and lush greenery"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Travel destination illustration"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                )}
              </div>
              <CardContent className="flex-grow p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readingTime} min read
                  </span>
                </div>
                <CardTitle className="mb-2 line-clamp-2 group-hover:line-clamp-none transition-all duration-300 min-h-[3rem]">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-base leading-relaxed">{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="ghost" className="p-0 h-auto group">
                  <Link href={`/blog/${post.slug}`} className="flex items-center text-primary font-medium">
                    Read more
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
