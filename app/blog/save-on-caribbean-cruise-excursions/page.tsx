import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, MapPin } from "lucide-react"
import { generateMetadata } from "./generateMetadata"
import ViatorBanner from "@/components/viator-banner"
import Image from "next/image"

export { generateMetadata }

export default function BlogPostPage() {
  const post = {
    slug: "save-on-caribbean-cruise-excursions",
    title: "🌴 How to Save on Excursions When Cruising in the Caribbean",
    excerpt:
      "Learn how to save up to 60% on Caribbean cruise excursions by using Viator and DayTrips.ai. Plan smarter, skip the cruise line markups, and get the most from your ports of call.",
    content: `
      <p><strong>Brought to you by DayTrips.ai – Your Smart Cruise Companion</strong></p>

      <p>There's no better way to experience the Caribbean than on a cruise—multiple destinations, breathtaking ocean views, and exotic adventures all in one trip. But here's a money-saving secret cruise lines don't advertise: <strong>you could be overpaying by 30-60% for excursions when you book through them</strong>.</p>

      <p>Instead, smart travelers are using platforms like <a href="https://www.viator.com/Nassau-tours/Port-Transfers/d420-g24-c4032?pid=P00244457&mcid=42383&medium=link&medium_version=selector&campaign=cruise" target="_blank" rel="noopener noreferrer sponsored">Viator</a> and <a href="https://www.daytrips.ai" target="_blank" rel="noopener noreferrer">DayTrips.ai</a> to plan amazing experiences at a fraction of the cost.</p>

      <h2>🚨 Why Cruise Line Excursions Are So Expensive</h2>
      <p>When you book an excursion through your cruise line, you're paying for the cruise brand's convenience—not the best deal. Here's a typical markup example:</p>
      <ul>
        <li><strong>Cruise Line Snorkel Trip in Nassau:</strong> $99 per person</li>
        <li><strong>Same tour on Viator:</strong> <a href="https://www.viator.com/Nassau-tours/Port-Transfers/d420-g24-c4032?pid=P00244457&mcid=42383&medium=link&medium_version=selector&campaign=cruise" target="_blank" rel="noopener noreferrer sponsored">$45 per person</a></li>
        <li><strong>That's a savings of 55%!</strong></li>
      </ul>

      <p>This isn't just a one-off. We've seen walking tours, beach day passes, and catamaran rides all priced <strong>30–60% lower on Viator</strong>—with the same safety standards and often better reviews.</p>

      <h2>💸 Use Viator for Affordable, Trusted Tours</h2>
      <p><a href="https://www.viator.com/Nassau-tours/Port-Transfers/d420-g24-c4032?pid=P00244457&mcid=42383&medium=link&medium_version=selector&campaign=cruise" target="_blank" rel="noopener noreferrer sponsored">Viator</a> works with thousands of top-rated local operators and offers excursions in every major Caribbean cruise port. Here's what makes it a no-brainer:</p>
      <ul>
        <li>✅ Tours verified by real travelers</li>
        <li>✅ Guaranteed on-time return to your ship</li>
        <li>✅ Mobile tickets & easy cancellations</li>
        <li>✅ Prices often 30–60% lower than cruise lines</li>
      </ul>

      <p>For example, if your cruise stops in Nassau, Bahamas, you can find <a href="https://www.viator.com/Nassau-tours/Port-Transfers/d420-g24-c4032?pid=P00244457&mcid=42383&medium=link&medium_version=selector&campaign=cruise" target="_blank" rel="noopener noreferrer sponsored">affordable port transfers, snorkeling trips, and island tours</a> starting as low as $25. Compare that to $80–$120 offered onboard.</p>

      <h2>🤖 Save Even More with DayTrips.ai</h2>
      <p><a href="https://www.daytrips.ai" target="_blank" rel="noopener noreferrer">DayTrips.ai</a> takes cruise planning to the next level. This AI-powered trip planner builds custom day itineraries based on your exact cruise port and docking time. No fluff, no wasted hours Googling "best things to do near San Juan cruise port."</p>

      <h3>How It Works:</h3>
      <ol>
        <li>🛳️ Enter your port and docking hours (e.g., Cozumel, 9 AM – 5 PM)</li>
        <li>🔍 The AI instantly searches nearby, affordable excursions, local attractions, and walkable activities</li>
        <li>💡 You get a full-day (or half-day) itinerary tailored to your time window</li>
      </ol>

      <h3>DayTrips.ai Helps You Save by:</h3>
      <ul>
        <li>🔎 Recommending free or low-cost alternatives to expensive tours</li>
        <li>📍 Identifying excursions within walking distance of the port (no taxi needed)</li>
        <li>⏱️ Matching activities to your docking schedule to avoid missing your ship</li>
        <li>💰 Prioritizing excursions under $50 that are top-rated on Viator or Google</li>
      </ul>

      <p><strong>Bonus:</strong> Planning with DayTrips.ai is 100% free. No signup required. Just enter your port and let AI do the rest.</p>

      <h2>📊 Real Savings: Cruise Excursion Comparison</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Port</th>
              <th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Excursion</th>
              <th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Cruise Price</th>
              <th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Viator Price</th>
              <th class="border border-gray-300 dark:border-gray-700 px-4 py-2">You Save</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Nassau</td>
              <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Island Sightseeing Tour</td>
              <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">$79</td>
              <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">$34</td>
              <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">57%</td>
            </tr>
            <tr class="bg-gray-50 dark:bg-gray-900">
              <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">San Juan</td>
              <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Old Town Walking Tour</td>
              <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">$65</td>
              <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">$25</td>
              <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">62%</td>
            </tr>
            <tr>
              <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Grand Cayman</td>
              <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">Snorkel with Stingrays</td>
              <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">$99</td>
              <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">$45</td>
              <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">55%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>✅ Final Tips for Cruise Travelers</h2>
      <ul>
        <li><strong>Book early:</strong> Excursions sell out, and prices go up close to sail dates</li>
        <li><strong>Group up:</strong> Traveling with friends? Many Viator tours offer group discounts</li>
        <li><strong>Compare side-by-side:</strong> Check the cruise line option, then compare it to Viator and DayTrips.ai recommendations</li>
        <li><strong>Consider a DIY Day:</strong> With DayTrips.ai, you can often create your own amazing walking tour for free</li>
      </ul>

      <h2>🌍 Explore More, Spend Less with DayTrips.ai</h2>
      <p>Don't fall into the trap of overpriced cruise excursions. With <a href="https://www.viator.com/Nassau-tours/Port-Transfers/d420-g24-c4032?pid=P00244457&mcid=42383&medium=link&medium_version=selector&campaign=cruise" target="_blank" rel="noopener noreferrer sponsored">Viator's low-cost, verified tours</a> and <a href="https://www.daytrips.ai" target="_blank" rel="noopener noreferrer">DayTrips.ai's custom AI planning</a>, you'll make the most of every stop—without draining your wallet.</p>

      <p><strong>Whether you're a first-time cruiser or a seasoned traveler, DayTrips.ai is the tool you didn't know you needed.</strong></p>

      <p>📍 <strong>Ready to save?</strong></p>  
      <ul>
        <li><a href="https://www.viator.com/Nassau-tours/Port-Transfers/d420-g24-c4032?pid=P00244457&mcid=42383&medium=link&medium_version=selector&campaign=cruise" target="_blank" rel="noopener noreferrer sponsored">Find excursions in Nassau on Viator</a></li>
        <li><a href="https://www.daytrips.ai" target="_blank" rel="noopener noreferrer">Plan your next port stop with DayTrips.ai</a></li>
      </ul>

      <p><em>DayTrips.ai – Smart, simple travel planning for every cruise port.</em></p>
    `,
    date: "April 20, 2025",
    author: "Emma Roberts",
    readingTime: 6,
    location: "Caribbean",
    tags: ["Caribbean", "Cruise", "Travel Tips", "Budget Travel", "Excursions", "Viator"],
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

          <div className="relative h-[400px] w-full mb-10 rounded-xl overflow-hidden">
            <Image
              src="/images/caribbean-cruise-port.png"
              alt="Aerial view of cruise ships docked at a Caribbean port with turquoise waters"
              fill
              className="object-cover"
              priority
            />
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

          {/* Caribbean Cruise CTA Button */}
          <div className="my-10 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl border border-cyan-100 dark:border-cyan-800 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-cyan-800 dark:text-cyan-300 mb-2">
                  Plan Your Caribbean Adventure
                </h3>
                <p className="text-cyan-700 dark:text-cyan-400 max-w-md">
                  Create a personalized day trip itinerary for your next cruise port with our AI-powered trip planner!
                </p>
              </div>
              <a
                href="https://www.daytrips.ai"
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Generate Your Trip
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Viator CTA Button */}
          <div className="my-10 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-100 dark:border-amber-800 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-2">
                  Find Affordable Excursions
                </h3>
                <p className="text-amber-700 dark:text-amber-400 max-w-md">
                  Browse top-rated Caribbean excursions at prices 30-60% lower than cruise lines offer.
                </p>
              </div>
              <a
                href="https://www.viator.com/Nassau-tours/Port-Transfers/d420-g24-c4032?pid=P00244457&mcid=42383&medium=link&medium_version=selector&campaign=cruise"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Browse Excursions
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
