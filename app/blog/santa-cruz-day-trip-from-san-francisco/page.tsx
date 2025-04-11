import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, MapPin } from "lucide-react"
import { generateMetadata } from "./generateMetadata"
import ViatorBanner from "@/components/viator-banner"

export { generateMetadata }

export default function BlogPostPage() {
  const post = {
    slug: "santa-cruz-day-trip-from-san-francisco",
    title: "Santa Cruz Day Trip from San Francisco: Redwoods, Surf, and Boardwalk Fun",
    excerpt:
      "Discover the ultimate Santa Cruz day trip from San Francisco or Silicon Valley. Explore redwoods, beaches, and the iconic boardwalk. Book unforgettable experiences via Viator.",
    content: `
      <h2>Why Santa Cruz is the Perfect Day Trip from San Francisco</h2>
      
      <p>Need a quick escape from the city? Just 75 miles south of San Francisco lies Santa Cruz, California — a vibrant coastal town packed with natural beauty, adrenaline-pumping surf, towering redwoods, and a nostalgic boardwalk that never gets old. It's one of the best day trips from both San Francisco and Silicon Valley, offering something for everyone.</p>
      
      <p>🔗 <a href="https://www.viator.com/searchResults/all?text=Santa+Cruz%2C+CA&pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Book your Santa Cruz adventure here on Viator</a></p>
      
      <h2>Things to Do on a Santa Cruz Day Trip</h2>
      
      <p>Here's how to make the most of one epic day in Santa Cruz:</p>
      
      <h3>1. Morning: Hike Among the Redwoods at Henry Cowell Redwoods State Park</h3>
      
      <p>Start your day with a serene walk through towering coastal redwoods just 10 minutes from downtown. This peaceful escape offers flat trails and amazing photo ops.</p>
      
      <div class="my-8">
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20santa%20Cruz.jpg-QhweU7UuAUefrHHpN8DhfGCZMrWzNB.jpeg" alt="Sunset view of the Santa Cruz Beach Boardwalk with sky lift silhouetted against the golden sky" class="rounded-lg w-full object-cover max-h-[500px]" />
        <p class="text-sm text-center text-muted-foreground mt-2">The iconic Santa Cruz Beach Boardwalk at sunset</p>
      </div>
      
      <h3>2. Midday: Hit the Beach & Watch the Surfers</h3>
      
      <p>Drive down to West Cliff Drive and stop at Steamer Lane, one of the most famous surf spots in California. Whether you surf or spectate, the energy here is contagious.</p>
      
      <h3>3. Lunch: Fresh, Local Eats</h3>
      
      <p>Grab lunch at The Picnic Basket or Saturn Café for local, sustainable bites. Want a foodie experience? <a href="https://www.viator.com/searchResults/all?text=Santa+Cruz%2C+CA&pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Check out a Santa Cruz food tour on Viator</a>.</p>
      
      <h3>4. Afternoon: Classic Fun at the Santa Cruz Beach Boardwalk</h3>
      
      <p>Don't miss the Santa Cruz Beach Boardwalk, one of the oldest seaside amusement parks in the country. Ride the Giant Dipper roller coaster, play retro games, or relax on the beach.</p>
      
      <p>🔗 <a href="https://www.viator.com/searchResults/all?text=Santa+Cruz%2C+CA&pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Explore Santa Cruz boardwalk activities on Viator</a></p>
      
      <h2>Why You'll Love This Trip</h2>
      
      <ul>
        <li>It's only 1.5 hours from San Francisco or San Jose</li>
        <li>You get a mix of nature, beach, and nostalgic fun</li>
        <li>It's family-friendly, date-perfect, and solo-traveler approved</li>
      </ul>
      
      <p>With so many experiences available, you can customize your day. Want to go kayaking, ziplining, or wine tasting? You can find it all in Santa Cruz.</p>
      
      <p>🔗 <a href="https://www.viator.com/searchResults/all?text=Santa+Cruz%2C+CA&pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Book your Santa Cruz adventure here on Viator</a></p>
      
      <h2>Plan Your Santa Cruz Day Trip Now</h2>
      
      <p>Ready to explore redwoods, waves, and boardwalk wonders all in one day? Make your Santa Cruz trip effortless by booking activities in advance.</p>
      
      <p>👉 <a href="https://www.viator.com/searchResults/all?text=Santa+Cruz%2C+CA&pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Find and book your Santa Cruz day trip experiences on Viator</a></p>
      
      <p>Whether you're escaping the city for a spontaneous getaway or planning a special occasion, Santa Cruz, CA is one of the best day trips from San Francisco you can take. Go once and you'll be back again.</p>
    `,
    date: "March 28, 2025",
    author: "Emma Roberts",
    readingTime: 5,
    location: "Santa Cruz, California",
    tags: ["Santa Cruz", "San Francisco", "Day Trips", "California", "Boardwalk", "Redwoods"],
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
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-none 
prose-headings:text-foreground prose-headings:font-bold 
prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 
prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 
prose-p:text-base prose-p:leading-relaxed prose-p:mb-6 prose-p:text-muted-foreground 
prose-strong:font-semibold prose-strong:text-foreground 
prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:underline hover:prose-a:text-blue-800 dark:hover:prose-a:text-blue-300 prose-a:font-medium prose-a:transition-colors 
prose-ul:my-6 prose-ul:pl-6 
prose-li:text-muted-foreground prose-li:my-2 prose-li:leading-relaxed
prose-img:rounded-lg prose-img:shadow-md
[&>p]:text-[17px] [&>p]:leading-[1.8]
[&>ul]:list-disc [&>ul]:space-y-2
[&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6
[&>h3]:text-[20px] [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-4
[&_strong]:text-foreground [&_strong]:font-semibold
[&_a]:decoration-1 [&_a]:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Santa Cruz CTA Button */}
          <div className="my-10 p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl border border-blue-100 dark:border-blue-800 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">
                  Plan Your Santa Cruz Adventure
                </h3>
                <p className="text-blue-700 dark:text-blue-400 max-w-md">
                  Create a personalized day trip itinerary for Santa Cruz or any destination with our AI-powered trip
                  planner!
                </p>
              </div>
              <a
                href="https://www.daytrips.ai"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Generate Your Trip
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Written by</p>
              <p className="font-medium">{post.author}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
