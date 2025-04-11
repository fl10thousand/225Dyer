import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, MapPin } from "lucide-react"
import { generateMetadata } from "./generateMetadata"
import ViatorBanner from "@/components/viator-banner"

export { generateMetadata }

export default function BlogPostPage() {
  const post = {
    slug: "seattle-ballooning-family-adventure",
    title: "DayTrip.ai Spotlight: Soaring High with Seattle Ballooning – A Family-Owned Adventure Like No Other",
    excerpt:
      "Discover Seattle Ballooning, a family-owned hot air balloon adventure company offering breathtaking views of Mount Rainier and the Pacific Northwest landscape.",
    content: `
      <p>At DayTrip.ai, we love uncovering unique experiences that take your breath away—sometimes literally. This week, we're taking you sky-high with Seattle Ballooning, a family-owned excursion company that turns your Pacific Northwest bucket list into reality.</p>
      
      <div class="my-8">
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d5c959c8e8ad24ed5c02c59c7d9aba1f.JPEG-cl6kmH7cfIgg24Q5m6KQ9vfL8KOLDd.jpeg" alt="Colorful hot air balloon flying over lush green forest with mountains and golden sunset sky" class="rounded-lg w-full object-contain h-auto max-h-[600px] mx-auto" />
        <p class="text-sm text-center text-muted-foreground mt-2">Experience the magic of flight with Seattle Ballooning's colorful hot air balloons over the stunning Pacific Northwest landscape<br /><span class="text-xs italic">Photo credit: Seattle Ballooning</span></p>
      </div>
      
      <h2>A Sky-High Legacy</h2>
      
      <p>Seattle Ballooning isn't just about hot air balloon rides. It's about passion, precision, and family. Founded and operated by a team with deep roots in aviation and hospitality, this company brings together the best of both worlds. Whether you're a first-time flyer or a seasoned adventurer, you'll feel like part of the family from the moment you arrive.</p>
      
      <h2>Why We Love Them</h2>
      
      <h3>🌄 Scenic Views Like No Other</h3>
      <p>Imagine floating above the treetops as Mount Rainier rises majestically in the background. Seattle Ballooning offers luxury hot air balloon experiences over Washington's most stunning landscapes, from rolling vineyards to open farmlands—and yes, that epic mountain view.</p>
      
      <h3>🥂 A Toast to the Adventure</h3>
      <p>Each flight ends with a post-flight celebration featuring champagne or sparkling cider, a nod to classic ballooning tradition. It's the little details like this that make Seattle Ballooning stand out as an elevated (pun intended) experience.</p>
      
      <h3>👨‍👩‍👧‍👦 Family-Owned, Guest-Focused</h3>
      <p>What sets Seattle Ballooning apart? It's the people. As a family-run business, their warmth, hospitality, and personalized care shine through every step of the journey. You're not just a passenger—you're part of the story.</p>
      
      <h3>🎁 Perfect for Celebrations</h3>
      <p>Planning a surprise engagement, anniversary, or unforgettable birthday? These guys specialize in private flights and once-in-a-lifetime moments. They even offer gift cards, so you can give the gift of adventure.</p>
      
      <h2>The DayTrip.ai Takeaway</h2>
      
      <p>Seattle Ballooning is more than an excursion—it's a floating dream crafted with care by people who love what they do. If you're in the Seattle area or planning a visit, don't miss your chance to take flight with this exceptional family-owned company.</p>
      
      <p>🪂 Book your next adventure at <a href="https://www.seattleballooning.com" target="_blank" rel="noopener noreferrer">SeattleBallooning.com</a> and let your dream of flying become a reality.</p>
    `,
    date: "April 15, 2025",
    author: "Emma Roberts",
    readingTime: 4,
    location: "Seattle, Washington",
    tags: ["Seattle", "Hot Air Balloon", "Adventure", "Family Business", "Pacific Northwest"],
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
prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-medium prose-a:underline hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300 prose-a:transition-colors prose-a:border-b prose-a:border-blue-200 dark:prose-a:border-blue-800 hover:prose-a:border-blue-500 dark:hover:prose-a:border-blue-400 prose-a:pb-0.5
prose-ul:my-6 prose-ul:pl-6 
prose-li:text-muted-foreground prose-li:my-2 prose-li:leading-relaxed
prose-img:rounded-lg prose-img:shadow-md
[&>p]:text-[17px] [&>p]:leading-[1.8]
[&>ul]:list-disc [&>ul]:space-y-2
[&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6
[&>h3]:text-[20px] [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-4
[&_strong]:text-foreground [&_strong]:font-semibold
[&_a]:text-blue-600 [&_a]:dark:text-blue-400 [&_a]:font-medium [&_a]:underline [&_a]:border-b [&_a]:border-blue-200 [&_a]:dark:border-blue-800 [&_a]:pb-0.5 [&_a:hover]:text-blue-700 [&_a:hover]:dark:text-blue-300 [&_a:hover]:border-blue-500 [&_a:hover]:dark:border-blue-400"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Seattle CTA Button */}
          <div className="my-10 p-6 bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-900/20 dark:to-indigo-900/20 rounded-xl border border-sky-100 dark:border-sky-800 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-sky-800 dark:text-sky-300 mb-2">Plan Your Seattle Adventure</h3>
                <p className="text-sky-700 dark:text-sky-400 max-w-md">
                  Create a personalized day trip itinerary for Seattle or any destination with our AI-powered trip
                  planner!
                </p>
              </div>
              <a
                href="https://www.daytrips.ai"
                className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Generate Your Trip
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Seattle Ballooning Booking CTA */}
          <div className="my-10 p-6 bg-gradient-to-r from-amber-50 to-red-50 dark:from-amber-900/20 dark:to-red-900/20 rounded-xl border border-amber-100 dark:border-amber-800 shadow-md">
            <div className="flex flex-col items-center text-center gap-4">
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300">Ready to Take Flight?</h3>
              <p className="text-amber-700 dark:text-amber-400 max-w-lg">
                Experience the magic of hot air ballooning with Seattle Ballooning's family-owned adventure company.
              </p>
              <a
                href="https://www.seattleballooning.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Book Your Balloon Adventure
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
