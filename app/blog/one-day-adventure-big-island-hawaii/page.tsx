import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, MapPin } from "lucide-react"
import { generateMetadata } from "./generateMetadata"
import ViatorBanner from "@/components/viator-banner"

export { generateMetadata }

export default function BlogPostPage() {
  const post = {
    slug: "one-day-adventure-big-island-hawaii",
    title: "One Day Adventure Around the Big Island: The Ultimate Hawaii Itinerary",
    excerpt:
      "Experience the best of Hawaii's Big Island in just one day with our comprehensive itinerary covering beaches, waterfalls, volcanoes, and local cuisine from sunrise to sunset.",
    content: `
      <p>The Big Island of Hawaii is a paradise of diverse landscapes, from pristine beaches and lush rainforests to active volcanoes and starlit mountain peaks. While most visitors spend a week exploring this magnificent island, it's possible to experience many of its highlights in a single, well-planned day. This ambitious itinerary takes you on a full circle tour around the island, showcasing the best of what Hawaii has to offer.</p>
      
      <div class="my-8">
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20Ki%CC%84lauea.jpg-ZoWUCmsN97R7D4efH5zujIKwQo9d0Z.jpeg" alt="Scenic road on the Big Island of Hawaii with mountains and lush greenery" class="rounded-lg w-full object-cover max-h-[500px]" />
        <p class="text-sm text-center text-muted-foreground mt-2">The scenic roads of Hawaii's Big Island offer breathtaking views at every turn</p>
      </div>
      
      <h2>🌅 Morning: Beaches and Breakfast</h2>
      
      <h3>6:30 AM – Sunrise at Hapuna Beach</h3>
      <p>Begin your adventure on the stunning Kohala Coast with a sunrise visit to Hapuna Beach, consistently ranked among America's best beaches. The soft white sand, calm turquoise waters, and peaceful early morning atmosphere create a perfect Hawaiian welcome. Watch as the first light of day transforms the coastline into a golden paradise.</p>
      <p>📍 <strong>Location:</strong> Hapuna Beach State Park, Old Puako Rd, Waimea</p>
      
      <h3>8:00 AM – Breakfast in Waimea</h3>
      <p>After soaking in the morning rays, head to Waimea (about 20 minutes from Hapuna) for a hearty breakfast at Hawaiian Style Cafe. This local institution is famous for its massive portions – pancakes literally the size of your head – and authentic Hawaiian hospitality. Fuel up for the day ahead with their signature loco moco or macadamia nut pancakes.</p>
      <p>📍 <strong>Location:</strong> Hawaiian Style Cafe, 65-1290 Kawaihae Rd, Waimea</p>
      <p>🔗 <a href="https://www.viator.com/Big-Island-of-Hawaii/d669-ttd?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Book Waimea experiences on Viator</a></p>
      
      <h2>🌊 Late Morning: Waterfalls and Hilo Exploration</h2>
      
      <h3>9:00 AM – Akaka Falls & Rainbow Falls</h3>
      <p>Drive east across the island to visit two of Hawaii's most spectacular waterfalls. First, stop at the 442-foot Akaka Falls, where water plunges dramatically into a lush gorge. Then, continue to Rainbow Falls in Hilo, named for the rainbows that appear in its mist on sunny mornings. Both falls are easily accessible with short walks from their respective parking areas.</p>
      <p>📍 <strong>Location:</strong> Akaka Falls State Park, 875 Akaka Falls Rd, Honomu</p>
      <p>🔗 <a href="https://www.viator.com/tours/Big-Island-of-Hawaii/Big-Island-Waterfall-Tour-from-Kona-Waipio-Valley-Hamakua-Coast-and-Akaka-Falls/d669-6651WFALL?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Book waterfall tours on Viator</a></p>
      
      <h3>11:00 AM – Explore Downtown Hilo</h3>
      <p>Spend some time exploring Hilo, Hawaii's charming old town with its rich cultural heritage. Visit the vibrant Hilo Farmers Market to browse local produce, crafts, and tropical flowers. Then, head to Suisan Fish Market for some of the freshest poke (Hawaiian raw fish salad) on the island – the perfect light lunch before continuing your journey.</p>
      <p>📍 <strong>Location:</strong> Hilo Farmers Market, Corner of Mamo St & Kamehameha Ave, Hilo</p>
      
      <h2>🌋 Afternoon: Volcanoes and Black Sand Beaches</h2>
      
      <h3>12:00 PM – Hawai'i Volcanoes National Park</h3>
      <p>No visit to the Big Island is complete without exploring Hawai'i Volcanoes National Park, home to Kilauea, one of the world's most active volcanoes. Drive the Crater Rim Tour, marvel at the steam vents, and walk through the fascinating Thurston Lava Tube. If time permits, take the Chain of Craters Road down to the coast to see where lava has previously flowed into the ocean.</p>
      <p>📍 <strong>Location:</strong> Hawaii Volcanoes National Park, 1 Crater Rim Drive, Hawaii National Park</p>
      <p>🔗 <a href="https://www.viator.com/tours/Big-Island-of-Hawaii/Volcanoes-National-Park-Safari/d669-248255P3?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Book volcano tours on Viator</a></p>
      
      <h3>3:00 PM – Punaluu Black Sand Beach</h3>
      <p>Continue south to Punaluu Black Sand Beach, one of Hawaii's most unique coastal treasures. The jet-black sand, created from volcanic activity, provides a striking contrast against the blue ocean. This is also a favorite resting spot for Hawaiian green sea turtles (honu), which you can often spot basking on the shore. Remember to admire these protected creatures from a respectful distance.</p>
      <p>📍 <strong>Location:</strong> Punaluu Black Sand Beach, Highway 11 (between mile markers 55 and 56)</p>
      
      <h2>☕ Late Afternoon and Evening: Coffee, Sunset, and Dinner</h2>
      
      <h3>4:30 PM – Kau Coffee Mill</h3>
      <p>As you continue your journey, stop at Kau Coffee Mill for a quick tour and tasting of award-winning Hawaiian coffee. The Kau region has emerged as a premier coffee-growing area, rivaling the more famous Kona coffee. Learn about the cultivation process and pick up some freshly roasted beans to take home.</p>
      <p>📍 <strong>Location:</strong> Kau Coffee Mill, 96-2694 Wood Valley Rd, Pahala</p>
      
      <h3>5:30 PM – Sunset at South Point</h3>
      <p>Head to Ka Lae (South Point), the southernmost tip of the United States, to witness a spectacular Hawaiian sunset. The rugged cliffs and vast ocean views create a dramatic backdrop as the sun dips below the horizon, painting the sky in vibrant hues of orange, pink, and purple.</p>
      <p>📍 <strong>Location:</strong> South Point (Ka Lae), South Point Rd, Naalehu</p>
      
      <h3>7:00 PM – Dinner in Captain Cook or Kona</h3>
      <p>As you make your way back north along the western coast, stop for dinner at one of the excellent restaurants in Captain Cook or Kona. Try Rebel Kitchen for farm-to-table cuisine or Umekes for award-winning poke, fresh seafood, and local craft beer – the perfect way to experience Hawaii's vibrant food scene.</p>
      <p>📍 <strong>Location:</strong> Umekes Fish Market Bar & Grill, 74-5599 Luhia St, Kailua-Kona</p>
      <p>🔗 <a href="https://www.viator.com/tours/Big-Island-of-Hawaii/Kona-Historical-Walking-Food-Tour/d669-181276P1?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Book food tours on Viator</a></p>
      
      <h3>8:30 PM – Return to Kohala Coast</h3>
      <p>Complete your circle island adventure by returning to the Kohala Coast. As you drive under the starlit Hawaiian sky, reflect on the incredible diversity of landscapes and experiences you've encountered in just one day – from sunrise beaches and tropical waterfalls to active volcanoes and black sand shores.</p>
      
      <h2>🏝️ Tips for Your Big Island Adventure</h2>
      
      <ul>
        <li><strong>Start early:</strong> This itinerary packs a lot into one day, so beginning at sunrise is essential.</li>
        <li><strong>Rent a car:</strong> A rental car is absolutely necessary for this trip, preferably one that's comfortable for a full day of driving.</li>
        <li><strong>Bring supplies:</strong> Pack water, snacks, sunscreen, and a light jacket (for higher elevations at the volcano).</li>
        <li><strong>Be flexible:</strong> Volcanic activity can change access to certain areas, so check park conditions before your visit.</li>
        <li><strong>Consider a guided tour:</strong> If this itinerary seems ambitious, consider booking a guided circle island tour that covers many of these highlights.</li>
      </ul>
      
      <p>While this one-day itinerary allows you to experience many of the Big Island's highlights, consider extending your stay if possible. Each region deserves deeper exploration, and there's so much more to discover on this magnificent island paradise.</p>
      
      <p>🔗 <a href="https://www.viator.com/Big-Island-of-Hawaii/d669-ttd?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Explore more Big Island tours and activities on Viator</a></p>
    `,
    date: "April 10, 2025",
    author: "Emma Roberts",
    readingTime: 8,
    location: "Big Island, Hawaii",
    tags: ["Hawaii", "Big Island", "Day Trips", "Travel Guide", "Volcanoes"],
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

          {/* Hawaii CTA Button */}
          <div className="my-10 p-6 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-xl border border-teal-100 dark:border-teal-800 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300 mb-2">Plan Your Hawaii Adventure</h3>
                <p className="text-teal-700 dark:text-teal-400 max-w-md">
                  Create a personalized day trip itinerary for Hawaii or any destination with our AI-powered trip
                  planner!
                </p>
              </div>
              <a
                href="https://www.daytrips.ai"
                className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
              <p className="font-medium">day trips.ai</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
