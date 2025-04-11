import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, MapPin } from "lucide-react"
import { generateMetadata } from "./generateMetadata"
import ViatorBanner from "@/components/viator-banner"

export { generateMetadata }

export default function BlogPostPage() {
  const post = {
    slug: "perfect-one-day-itinerary-newport-rhode-island",
    title: "The Perfect One-Day Itinerary for Newport, Rhode Island",
    excerpt:
      "Discover the best of Newport, Rhode Island in just one day with this curated itinerary featuring historic mansions, coastal walks, sailing adventures, and world-class dining.",
    content: `
      <p>Looking for a perfect day trip to Newport, Rhode Island? Whether you're a history buff, foodie, beach lover, or adventure seeker, Newport offers stunning coastal views, historic mansions, and world-class dining—all in one compact and walkable city.</p>
      
      <p>With this one-day itinerary, you'll experience the best of Newport, from breathtaking ocean walks to luxury yacht tours. Best of all, you can book top-rated experiences in Newport instantly with this curated selection.</p>
      
      <h2>🚗 Morning: Explore Newport's Historic Mansions & Cliff Walk</h2>
      
      <h3>8:30 AM – Breakfast at Corner Café ☕🥞</h3>
      <p>Kickstart your day with a delicious breakfast at Corner Café, a local favorite known for its hearty omelets, Portuguese sweet bread French toast, and great coffee.</p>
      
      <p>📍 Location: 110 Broadway, Newport, RI</p>
      
      <h3>9:30 AM – Walk the Famous Cliff Walk 🌊🏞️</h3>
      <p>A trip to Newport isn't complete without a stroll along the Cliff Walk, a 3.5-mile scenic trail along the coastline, featuring panoramic ocean views and stunning Gilded Age mansions. You can choose to walk the entire route or do a shorter, more accessible section.</p>
      
      <p>🆓 Free Activity</p>
      <p>📍 Trailhead: 117 Memorial Blvd, Newport, RI</p>
      
      <p>🔗 Want a guided Cliff Walk tour? Book one here: <a href="https://www.viator.com/Newport-attractions/Newport-Cliff-Walk/d4380-a10968?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Cliff Walk Experiences</a></p>
      
      <h3>10:30 AM – Tour the Breakers Mansion 🏰</h3>
      <p>Step inside The Breakers, the most famous of Newport's historic mansions. This opulent Vanderbilt summer home is a must-see, showcasing jaw-dropping architecture and lavish interiors.</p>
      
      <p>🎟️ Admission Fee: $29 for adults</p>
      <p>📍 Location: 44 Ochre Point Ave, Newport, RI</p>
      
      <p>🔗 Prefer a guided mansion tour? Check out options here: <a href="https://www.viator.com/tours/Newport/Gilded-Age-Mansion-Tour/d4380-40169P2?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Newport Mansion Tours</a></p>
      
      <div class="my-8">
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Day%20trips%20newpoer%20mansions.jpg-J5mHvTd0rGX8qQhsoKwFYC5SJKzNzT.jpeg" alt="The Breakers Mansion in Newport with dramatic cloudy sky" class="rounded-lg w-full object-cover max-h-[500px]" />
        <p class="text-sm text-center text-muted-foreground mt-2">The Breakers Mansion, one of Newport's most famous Gilded Age estates</p>
      </div>
      
      <h2>🍽️ Afternoon: Waterfront Dining & Sailing Adventures</h2>
      
      <h3>12:30 PM – Lunch at The Mooring Seafood Kitchen & Bar 🦞</h3>
      <p>Enjoy fresh seafood with a waterfront view at The Mooring, famous for its lobster rolls, oysters, and "Bag of Doughnuts" (fried seafood fritters).</p>
      
      <p>📍 Location: 1 Sayers Wharf, Newport, RI</p>
      
      <p>🔗 Want a food tour instead? Book a Newport culinary experience here: <a href="https://www.viator.com/Newport-tours/Food-Tours/d4380-g6-c80?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Newport Food Tours</a></p>
      
      <h3>2:00 PM – Set Sail on a Newport Harbor Cruise ⛵🏝️</h3>
      <p>No visit to Newport is complete without getting out on the water. Take a sailing tour of Newport Harbor, where you'll see famous sights like:</p>
      <ul>
        <li>✅ Fort Adams</li>
        <li>✅ The Pell Bridge</li>
        <li>✅ Millionaire's Row from the water</li>
      </ul>
      
      <p>🔗 Book a top-rated Newport sailing cruise here: <a href="https://www.viator.com/searchResults/all?text=newprort+rhode+island&pid=P00244457&mcid=42383&medium=link&campaign=n" target="_blank" rel="noopener noreferrer sponsored">Newport Sailing Tours</a></p>
      
      <p>🎟️ Prices vary by boat type (yacht, catamaran, schooner, etc.)</p>
      
      <div class="my-8">
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20sailboat%20newport.jpg-WJstuAGmnsFWEjjJxogMS5lAuFM6yz.jpeg" alt="Sailboat tour in Newport harbor with passengers" class="rounded-lg w-full object-cover max-h-[500px]" />
        <p class="text-sm text-center text-muted-foreground mt-2">Experience Newport from the water with a scenic sailing tour</p>
      </div>
      
      <h2>🍷 Evening: Sunset Views & Nightlife</h2>
      
      <h3>5:00 PM – Drinks at Castle Hill Inn 🌅🍹</h3>
      <p>Unwind with a cocktail at Castle Hill Inn, which has the best sunset views in Newport. Try their signature Dark & Stormy while watching the sun dip over Narragansett Bay.</p>
      
      <p>📍 Location: 590 Ocean Drive, Newport, RI</p>
      
      <p>🔗 Prefer a sunset cruise instead? Book one here: <a href="https://www.viator.com/Newport-tours/Sailing-Trips/d4380-g3-c10?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Newport Sunset Cruises</a></p>
      
      <h3>7:00 PM – Dinner at 22 Bowen's Wine Bar & Grille 🥩🍷</h3>
      <p>Cap off your day with a fine dining experience at 22 Bowen's, known for steaks, fresh seafood, and an extensive wine list.</p>
      
      <p>📍 Location: 22 Bowen's Wharf, Newport, RI</p>
      
      <p>🔗 Looking for an evening ghost tour or pub crawl? Check out these experiences: <a href="https://www.viator.com/tours/Newport/Ghost-Tour-Through-Newport-RI/d4380-408874P1?pid=P00244457&mcid=42383&medium=link" target="_blank" rel="noopener noreferrer sponsored">Newport Nightlife & Ghost Tours</a></p>
      
      <div class="my-8">
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trip%20in%20newport%20RI.jpg-X0PnKENg7haB3QqwBIgjl7U7GPF5r7.jpeg" alt="Sunset view of Newport harbor with silhouette of statue" class="rounded-lg w-full object-cover max-h-[500px]" />
        <p class="text-sm text-center text-muted-foreground mt-2">Stunning sunset views over Newport harbor</p>
      </div>
      
      <h2>✨ Bonus Activities if You Have Extra Time</h2>
      
      <ul>
        <li>🔹 Visit Fort Adams: Explore Newport's largest coastal fortification.</li>
        <li>🔹 Tour the International Tennis Hall of Fame: A must for sports enthusiasts.</li>
        <li>🔹 Shop at Bowen's Wharf: Browse local boutiques and souvenir shops.</li>
      </ul>
      
      <p>🔗 Find even more Newport activities here: <a href="https://www.viator.com/searchResults/all?text=newprort+rhode+island&pid=P00244457&mcid=42383&medium=link&campaign=n" target="_blank" rel="noopener noreferrer sponsored">Book Excursions in Newport</a></p>
      
      <h2>📌 Final Thoughts: Why Newport is the Perfect Day Trip</h2>
      
      <p>Newport, Rhode Island, is a dream destination for travelers looking for a blend of history, luxury, and adventure—all in one compact and walkable town. Whether you love coastal views, fine dining, sailing, or history, this one-day itinerary covers it all!</p>
      
      <p>💡 Want to make the most of your trip? Let AI find the perfect Newport activities for you in seconds with DayTrip.ai!</p>
      
      <p>📍 Or, book the best Newport experiences directly here: <a href="https://www.viator.com/searchResults/all?text=newprort+rhode+island&pid=P00244457&mcid=42383&medium=link&campaign=n" target="_blank" rel="noopener noreferrer sponsored">Newport Activities & Tours</a></p>
    `,
    date: "March 20, 2025",
    author: "Emma Roberts",
    readingTime: 6,
    location: "Newport, Rhode Island",
    tags: ["Newport", "Rhode Island", "Day Trips", "Travel Guide", "Coastal Getaway"],
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

          {/* Newport CTA Button */}
          <div className="my-10 p-6 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl border border-blue-100 dark:border-blue-800 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">Plan Your Newport Adventure</h3>
                <p className="text-blue-700 dark:text-blue-400 max-w-md">
                  Create a personalized day trip itinerary for Newport or any destination with our AI-powered trip
                  planner!
                </p>
              </div>
              <a
                href="http://www.daytrips.ai"
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
