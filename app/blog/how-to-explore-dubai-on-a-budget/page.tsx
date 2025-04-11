import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, MapPin } from "lucide-react"
import { generateMetadata } from "./generateMetadata"
import ViatorBanner from "@/components/viator-banner"

export { generateMetadata }

export default function BlogPostPage() {
  const post = {
    slug: "how-to-explore-dubai-on-a-budget",
    title: "How to Explore Dubai on a Budget: The Ultimate One-Day Itinerary",
    excerpt:
      "Discover how to experience Dubai's top attractions, stunning views, and cultural gems without breaking the bank with our budget-friendly one-day itinerary.",
    content: `
    <p>Dubai is known for its luxury, skyscrapers, and lavish experiences, but did you know you can enjoy the city without breaking the bank? With the right planning, you can experience Dubai's top attractions, stunning views, and cultural gems—all on a budget.</p>
    
    <p>Whether you're a backpacker, a solo traveler, or just looking to save money, this one-day budget itinerary will show you how to see the best of Dubai for less!</p>
    
    <p>🔗 Want to book affordable Dubai activities? <a href="https://www.viator.com/Dubai/d828-ttd?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Click here: Budget-Friendly Dubai Tours</a></p>
    
    <h2>🌞 Morning: Start the Day with Iconic Landmarks</h2>
    
    <h3>8:00 AM – Breakfast at Al Fahidi Historical District 🍵</h3>
    <p>Begin your day in the Al Fahidi Historical District, one of Dubai's oldest neighborhoods. Have a traditional Emirati breakfast at The Arabian Tea House, famous for its delicious karak tea and chebab pancakes.</p>
    
    <p>💰 Cost: ~$6–$10</p>
    <p>📍 Location: Al Fahidi St, Bur Dubai</p>
    
    <p>🔗 Want a guided Old Dubai walking tour? <a href="https://www.viator.com/Dubai/d828-ttd?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Book here: Old Dubai Experiences</a></p>
    
    <h3>9:30 AM – Ride the Abra Across Dubai Creek 🚣</h3>
    <p>Hop on a traditional wooden abra boat for just 1 AED ($0.30) and cross Dubai Creek from Bur Dubai to Deira. This short ride offers stunning views of the city's old trading hub.</p>
    
    <p>💰 Cost: $0.30 (1 AED)</p>
    <p>📍 Location: Bur Dubai Abra Station</p>
    
    <p>🔗 Prefer a full Dubai Creek tour? <a href="https://www.viator.com/Dubai/d828-ttd?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Check out these options: Dubai Creek Tours</a></p>
    
    <h3>10:00 AM – Explore the Gold & Spice Souks 🌿✨</h3>
    <p>Once you cross the creek, take a stroll through the Gold Souk & Spice Souk in Deira. Admire stunning gold jewelry, fragrant spices, and authentic Arabian perfumes—all without spending a dirham!</p>
    
    <p>💰 Cost: Free (unless you shop!)</p>
    <p>📍 Location: Deira, Dubai</p>
    
    <p>🔗 Looking for a guided market tour? <a href="https://www.viator.com/Dubai/d828-ttd?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Find one here: Dubai Souk Tours</a></p>
    
    <h2>🍽️ Afternoon: Budget-Friendly Sightseeing & Food</h2>
    
    <h3>12:30 PM – Lunch at Al Ustad Special Kabab 🍢</h3>
    <p>One of Dubai's best budget-friendly restaurants, Al Ustad is famous for mouthwatering Iranian kebabs, rice, and yogurt dips. A full meal here costs under $10!</p>
    
    <p>💰 Cost: ~$8–$12</p>
    <p>📍 Location: Al Mankhool, Bur Dubai</p>
    
    <p>🔗 Prefer a local food tour? <a href="https://www.viator.com/Dubai/d828-ttd?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Check out these options: Dubai Food Tours</a></p>
    
    <h3>2:00 PM – Visit the Dubai Frame 🖼️🏙️</h3>
    <p>The Dubai Frame offers stunning skyline views of both Old & New Dubai—and it's one of the most affordable attractions in the city!</p>
    
    <p>🎟️ Entry Fee: ~$14 (50 AED)</p>
    <p>📍 Location: Zabeel Park, Dubai</p>
    
    <p>🔗 <a href="https://www.viator.com/Dubai/d828-ttd?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Book discounted tickets here: Dubai Frame Tickets</a></p>
    
    <h3>3:30 PM – Visit the Free Public Beaches 🏖️</h3>
    <p>Dubai has gorgeous public beaches where you can swim and relax for free. Two great options:</p>
    
    <p>🌴 La Mer Beach – A trendy area with murals, cafes, and water activities.</p>
    <p>🏝️ JBR Beach – A lively beach with a great view of Ain Dubai (the world's tallest Ferris wheel).</p>
    
    <p>💰 Cost: Free</p>
    <p>📍 Location: La Mer or JBR Beach</p>
    
    <p>🔗 Want a fun beach activity? <a href="https://www.viator.com/Dubai/d828-ttd?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Check out these options: Dubai Water Sports</a></p>
    
    <div class="my-8">
      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20to%20dubai.jpg-EuapD6qvpFOBr8yh98dGuYTWDT0hgc.jpeg" alt="Dubai skyline at night with illuminated skyscrapers and a purple-lit bridge" class="rounded-lg w-full object-cover max-h-[500px]" />
      <p class="text-sm text-center text-muted-foreground mt-2">Dubai's stunning skyline at night - a view that costs nothing to enjoy</p>
    </div>
    
    <h2>🌆 Evening: Sunset & Iconic Dubai on a Budget</h2>
    
    <h3>6:00 PM – Watch the Dubai Fountain Show 🌊💃</h3>
    <p>One of Dubai's most spectacular free attractions, the Dubai Fountain Show is a mesmerizing water, music, and light performance that happens every 30 minutes in the evening.</p>
    
    <p>💰 Cost: Free</p>
    <p>📍 Location: Burj Khalifa Lake, Downtown Dubai</p>
    
    <p>🔗 Want to see the fountain show from a boat? <a href="https://www.viator.com/Dubai/d828-ttd?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Book a ride here: Dubai Fountain Boat Rides</a></p>
    
    <h3>7:30 PM – Explore the Dubai Mall (and Eat for Cheap!) 🛍️</h3>
    <p>Dubai Mall isn't just for shopping—it has free attractions like:</p>
    <ul>
      <li>✅ The Dubai Aquarium (view the massive tank for free from outside!)</li>
      <li>✅ The Rainforest Café Waterfall</li>
      <li>✅ The Ice Rink viewing area</li>
    </ul>
    
    <p>For dinner, grab an affordable shawarma or falafel wrap (~$5) at the food court.</p>
    
    <p>💰 Cost: Free entry, food ~$5–$10</p>
    <p>📍 Location: Downtown Dubai</p>
    
    <p>🔗 Looking for a budget-friendly Dubai Mall experience? <a href="https://www.viator.com/Dubai/d828-ttd?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Check here: Dubai Mall Tours</a></p>
    
    <h2>✨ Bonus Budget Tips for Dubai Travelers</h2>
    
    <ul>
      <li>🔹 Use public transport – The Dubai Metro is clean, safe, and only ~$1–$2 per ride.</li>
      <li>🔹 Drink tap water – Dubai's water is safe and avoids the cost of bottled water.</li>
      <li>🔹 Visit free attractions – Parks, souks, beaches, and mosques offer amazing experiences at no cost.</li>
      <li>🔹 Book tours in advance – <a href="https://www.viator.com/Dubai/d828-ttd?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Find budget-friendly tours here</a>.</li>
    </ul>
    
    <h2>📌 Final Thoughts: Dubai Can Be Budget-Friendly!</h2>
    
    <p>Dubai is often seen as an expensive destination, but with smart planning and local tips, you can experience the best of this incredible city without overspending.</p>
    
    <p>💡 Want an AI to plan your Dubai trip for free? Try DayTrip.ai for an instant, budget-friendly itinerary!</p>
    
    <p>🔗 Or, <a href="https://www.viator.com/Dubai/d828-ttd?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">book affordable Dubai experiences here: Dubai Budget Tours</a></p>
  `,
    date: "March 25, 2025",
    author: "Emma Roberts",
    readingTime: 7,
    location: "Dubai, UAE",
    tags: ["Dubai", "Budget Travel", "Day Trips", "Travel Guide", "UAE"],
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

          {/* Dubai CTA Button */}
          <div className="my-10 p-6 bg-gradient-to-r from-amber-50 to-blue-50 dark:from-amber-900/20 dark:to-blue-900/20 rounded-xl border border-amber-100 dark:border-amber-800 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-2">Plan Your Dubai Adventure</h3>
                <p className="text-amber-700 dark:text-amber-400 max-w-md">
                  Create a personalized day trip itinerary for Dubai or any destination with our AI-powered trip
                  planner!
                </p>
              </div>
              <a
                href="https://www.daytrips.ai"
                className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
