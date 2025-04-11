import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, MapPin } from "lucide-react"
import { generateMetadata } from "./generateMetadata"
import ViatorBanner from "@/components/viator-banner"

export { generateMetadata }

export default function BlogPostPage() {
  const post = {
    slug: "perfect-day-trip-savannah-georgia",
    title: "A Perfect Day Trip to Savannah, Georgia: History, Charm & Southern Flavor",
    excerpt:
      "Discover the ultimate day trip to Savannah, Georgia with our guide to historic sites, charming streets, and Southern cuisine. Plan your perfect Savannah adventure today!",
    content: `
      <p>If you're looking for a destination that blends Southern charm, rich history, and picture-perfect streets, <strong>Savannah, Georgia</strong> needs to be at the top of your list. Whether you're in town for a full vacation or just passing through on a weekend escape, Savannah delivers one of the most walkable, photo-worthy, and food-filled day trips in the South.</p>
      
      <h2>🏛️ Why Savannah is Perfect for a Day Trip</h2>
      
      <p>From the moment you step onto the cobblestone streets of Savannah's Historic District, you're transported to another time. Spanish moss drapes over 18th-century oaks, and grand antebellum homes line the sidewalks. Add in a thriving arts scene, riverfront shopping, and incredible food — and you've got the ultimate recipe for a memorable day.</p>
      
      <p>Some highlights you shouldn't miss:</p>
      <ul>
        <li>Forsyth Park (and that iconic fountain)</li>
        <li>River Street's waterfront shops and candy stores</li>
        <li>Historic home tours (think haunted mansions and hidden courtyards)</li>
        <li>A sunset walk or river cruise along the Savannah River</li>
      </ul>
      
      <div class="my-8">
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20Savannah%2C%20Georgia.jpg-jSxYPdQ3SFuixitoi59E2DHmlvgaoI.jpeg" alt="Sunset view of Savannah's riverfront with the Georgia Queen riverboat and historic buildings" class="rounded-lg w-full object-cover max-h-[500px]" />
        <p class="text-sm text-center text-muted-foreground mt-2">Sunset view of Savannah's historic riverfront with the Georgia Queen riverboat</p>
      </div>
      
      <h2>🗺️ Plan Your Day Trip in Seconds</h2>
      
      <p>Want to explore Savannah without spending hours on Google? That's where <a href="https://www.daytrips.ai" target="_blank" rel="noopener noreferrer">Day Trips.ai</a> comes in. Just tell the AI your location, interests, and how much time you have, and it instantly builds a <strong>personalized Savannah itinerary</strong> — from foodie stops to photo ops — in seconds.</p>
      
      <p>It's like having your own local guide, minus the planning stress.<br />
      Best part? It's <strong>completely free.</strong></p>
      
      <h2>🎟️ Book Must-Do Savannah Experiences</h2>
      
      <p>Ready to explore Savannah's rich history and hidden corners with the help of local guides? Whether you want a spooky nighttime ghost tour, a foodie walking experience, or a scenic riverboat ride, you'll find it all here:</p>
      
      <p>👉 <a href="https://www.viator.com/Savannah/d5166-ttd?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Browse top-rated Savannah experiences on Viator</a></p>
      
      <p>Popular tours include:</p>
      <ul>
        <li>Savannah Ghosts & Gravestones Trolley Tour</li>
        <li>Walking tours through the Historic District</li>
        <li>Hop-on, hop-off trolleys</li>
        <li>Food & drink tours with local experts</li>
      </ul>
      
      <p>There's truly something for every type of traveler.</p>
      
      <h2>📸 Final Thoughts</h2>
      
      <p>Savannah is more than just a pretty city — it's a soulful experience filled with stories, flavors, and moments you'll want to relive again and again. Whether you plan your day through <a href="https://www.daytrips.ai" target="_blank" rel="noopener noreferrer">Day Trips.ai</a> or book a curated experience through <a href="https://www.viator.com/Savannah/d5166-ttd?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Viator</a>, this Southern gem won't disappoint.</p>
      
      <p>So pack your walking shoes, charge your phone (you'll need it for all the photos), and get ready to fall in love with <strong>Savannah</strong>.</p>
    `,
    date: "April 5, 2025",
    author: "Emma Roberts",
    readingTime: 5,
    location: "Savannah, Georgia",
    tags: ["Savannah", "Georgia", "Day Trips", "Travel Guide", "Southern Charm"],
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

        <article
          className="prose prose-lg dark:prose-invert max-w-none 
prose-headings:text-foreground prose-headings:font-bold 
prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 
prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 
prose-p:text-base prose-p:leading-relaxed prose-p:mb-6 prose-p:text-muted-foreground 
prose-strong:font-semibold prose-strong:text-foreground 
prose-a:text-green-600 dark:prose-a:text-green-400 prose-a:font-medium prose-a:underline hover:prose-a:text-green-700 dark:hover:prose-a:text-green-300 prose-a:transition-colors prose-a:border-b-2 prose-a:border-green-200 dark:prose-a:border-green-800 hover:prose-a:border-green-500 dark:hover:prose-a:border-green-400 prose-a:pb-0.5
prose-ul:my-6 prose-ul:pl-6 
prose-li:text-muted-foreground prose-li:my-2 prose-li:leading-relaxed
prose-img:rounded-lg prose-img:shadow-md
[&>p]:text-[17px] [&>p]:leading-[1.8]
[&>ul]:list-disc [&>ul]:space-y-2
[&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6
[&>h3]:text-[20px] [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-4
[&_strong]:text-foreground [&_strong]:font-semibold
[&_a]:text-green-600 [&_a]:dark:text-green-400 [&_a]:font-medium [&_a]:underline [&_a]:border-b-2 [&_a]:border-green-200 [&_a]:dark:border-green-800 [&_a]:pb-0.5 [&_a:hover]:text-green-700 [&_a:hover]:dark:text-green-300 [&_a:hover]:border-green-500 [&_a:hover]:dark:border-green-400 [&_a:hover]:bg-green-50 [&_a:hover]:dark:bg-green-900/20"
        >
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
prose-a:text-primary hover:prose-a:text-primary/80 prose-a:transition-colors 
prose-ul:my-6 prose-ul:pl-6 
prose-li:text-muted-foreground prose-li:my-2 prose-li:leading-relaxed
prose-img:rounded-lg prose-img:shadow-md
[&>p]:text-[17px] [&>p]:leading-[1.8]
[&>ul]:list-disc [&>ul]:space-y-2
[&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6
[&>h3]:text-[20px] [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-4
[&_strong]:text-foreground [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Savannah CTA Button */}
          <a
            href="http://www.daytrips.ai"
            className="block no-underline border-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="my-10 p-6 bg-gradient-to-r from-green-50 to-amber-50 dark:from-green-900/20 dark:to-amber-900/20 rounded-xl border border-green-100 dark:border-green-800 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
                  Plan Your Savannah Adventure
                </h3>
                <p className="text-green-700 dark:text-green-400 max-w-md mx-auto">
                  Create a personalized day trip itinerary for Savannah or any destination with our AI-powered trip
                  planner!
                </p>
              </div>
            </div>
          </a>

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
