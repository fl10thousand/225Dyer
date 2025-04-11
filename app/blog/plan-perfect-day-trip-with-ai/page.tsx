"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, MapPin } from "lucide-react"
import ViatorBanner from "@/components/viator-banner"
import { SocialShareButtons } from "@/components/social-share-buttons"

// Add this CSS block right after the imports
const linkStyles = `
  .blog-perfect-day-trip a:not(.no-highlight) {
    text-decoration: underline;
    text-decoration-thickness: 1.5px;
    text-underline-offset: 2px;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .blog-perfect-day-trip a:not(.no-highlight):hover {
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
    opacity: 0.9;
  }
  
  .blog-perfect-day-trip .city-link {
    border-left: 3px solid #3b82f6;
    text-decoration: none;
    font-weight: 600;
  }
  
  .blog-perfect-day-trip .cta-link {
    text-decoration: none;
    border-bottom: 2px solid currentColor;
  }
`

export default function PlanPerfectDayTripWithAI() {
  return (
    <>
      <style jsx global>
        {linkStyles}
      </style>
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/50 py-12 md:py-24">
        <div className="container max-w-[calc(4xl-140px)] mx-auto px-4 sm:px-6 xl:pr-36 blog-perfect-day-trip">
          {/* Add the ViatorBanner component here */}
          <div className="relative">
            <div className="fixed top-36 right-4 z-10 hidden xl:block">
              <ViatorBanner />
            </div>
          </div>

          <Button variant="ghost" asChild className="mb-8 group no-highlight">
            <Link href="/blog" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </Button>

          <article className="prose prose-lg dark:prose-invert max-w-none">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                Plan the Perfect Day Trip Instantly with DayTrips.ai – Your AI-Powered Travel Assistant
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  April 25, 2025
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />5 min read
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Global
                </span>
              </div>

              {/* Add social share buttons below the post metadata */}
              <div className="mt-4">
                <SocialShareButtons title="Plan the Perfect Day Trip Instantly with DayTrips.ai – Your AI-Powered Travel Assistant" />
              </div>
            </div>

            <div className="relative w-full mb-10 rounded-xl overflow-hidden aspect-[16/9] md:aspect-[21/9] lg:h-[400px]">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mantas-hesthaven-_g1WdcKcV3w-unsplash-2.jpg-z2m0bl5IqnRkSO9HSz1N6qwYTPt9bB.jpeg"
                alt="Person with suitcase looking at sunset through an archway"
                className="object-cover w-full h-full"
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>

            <div
              className={`prose prose-lg dark:prose-invert max-w-none 
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
            [&_strong]:text-foreground [&_strong]:font-semibold`}
            >
              <p>
                Looking for things to do near you or in a new city? Want to explore somewhere without spending hours on
                research? <strong>DayTrips.ai</strong> is your go-to <strong>AI day trip planner</strong>—perfect for
                travelers, families, couples, and locals alike.
              </p>

              <p>
                In just a few clicks, you'll get a <strong>custom day trip itinerary</strong> based on your location,
                time, interests, and budget.
              </p>

              <hr className="my-8" />

              <h2 className="text-2xl font-bold mt-10 mb-4">🧭 What Is DayTrips.ai?</h2>

              <p>
                <strong>DayTrips.ai</strong> is a <strong>free travel planning tool</strong> that helps you discover the
                best activities, attractions, and experiences in any city, instantly. Whether you're looking for{" "}
                <strong>day trip ideas near me</strong> or planning a vacation, our AI builds a personalized itinerary
                tailored to you.
              </p>

              <div className="my-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
                    <img
                      src="https://sjc.microlink.io/q2w6NaK_ZLE_xy9BBK5Nu49IMpOrKsH-njVkipTHYhjlPKqfNXUBUIF-wL4bV8hZiWhBQdtkLnm_glN8tLjQ_Q.jpeg"
                      alt="Screenshot of DayTrips.ai website interface showing the trip generator form"
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="md:w-1/2 md:pl-4">
                    <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Perfect For:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Quick weekend adventures</li>
                      <li>Business travelers with downtime</li>
                      <li>Family outings</li>
                      <li>Romantic date ideas</li>
                      <li>Solo explorations</li>
                      <li>Spontaneous getaways</li>
                    </ul>
                  </div>
                </div>
              </div>

              <hr className="my-8" />

              <h2 className="text-2xl font-bold mt-10 mb-4">🚀 How It Works – Plan a Day Trip in 7 Simple Steps</h2>

              <p>
                <em>No app, no account, no stress.</em>
              </p>

              <ol className="list-decimal pl-5 space-y-2 my-6">
                <li>
                  <strong>Enter Your Location:</strong> Type in any city worldwide (e.g. "Barcelona, Spain" or "Kona,
                  Hawaii").
                </li>
                <li>
                  <strong>Select Your Interests:</strong> From food and dining to art, nature, shopping, and
                  family-friendly fun—check what you love.
                </li>
                <li>
                  <strong>Choose Your Budget:</strong> Pick between Free, Moderate, or Premium options.
                </li>
                <li>
                  <strong>Pick Your Transportation Type:</strong> Let us know if you're walking, driving, or using
                  public transportation.
                </li>
                <li>
                  <strong>Set Your Start & End Time:</strong> Planning a 3-hour trip or a full-day adventure? Just set
                  your times.
                </li>
                <li>
                  <strong>Add Meal Preferences (Optional):</strong> Want vegetarian options, Italian cuisine, or
                  something kid-friendly? We've got you.
                </li>
                <li>
                  <strong>Accessibility Needs (Optional):</strong> Check this for wheelchair-accessible activities and
                  venues.
                </li>
              </ol>

              <p>
                <strong>👉 Then just hit "Generate Your Personalized Day Trip"—and let the magic happen.</strong>
              </p>

              <hr className="my-8" />

              <h2 className="text-2xl font-bold mt-10 mb-4">🌍 Who Should Use DayTrips.ai?</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="p-4 bg-muted/30 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">👨‍👩‍👧 Families</h3>
                  <p className="text-sm">Find educational, fun, and budget-friendly activities.</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">❤️ Couples</h3>
                  <p className="text-sm">Plan spontaneous date days with unique experiences.</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">🧳 Business Travelers</h3>
                  <p className="text-sm">
                    Maximize a few hours with curated things to do near the airport or your hotel.
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">🎒 Solo Adventurers</h3>
                  <p className="text-sm">Discover hidden gems without the planning headache.</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">🧠 Locals</h3>
                  <p className="text-sm">Think you've done it all? Let AI surprise you.</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">🌐 Digital Nomads</h3>
                  <p className="text-sm">Explore new cities like a pro without wasting time on travel forums.</p>
                </div>
              </div>

              <hr className="my-8" />

              <h2 className="text-2xl font-bold mt-10 mb-4">💡 Why It's Better Than Travel Blogs or Google Searches</h2>

              <ul className="list-disc pl-5 space-y-2 my-6">
                <li>
                  <strong>Instant results:</strong> No scrolling through pages of suggestions.
                </li>
                <li>
                  <strong>Hyper-personalized:</strong> It's your perfect day, not someone else's.
                </li>
                <li>
                  <strong>Time-sensitive:</strong> Suggestions based on your actual start and end time.
                </li>
                <li>
                  <strong>Local-first:</strong> Skip the tourist traps. We focus on authentic, local spots.
                </li>
                <li>
                  <strong>One-click bookings:</strong> Direct links to real excursions via Viator.
                </li>
              </ul>

              <hr className="my-8" />

              <h2 className="text-2xl font-bold mt-10 mb-4">✈️ Where Can I Use It?</h2>

              <p>
                <strong>Anywhere in the world.</strong> From small towns to major metros, DayTrips.ai adapts to your
                location and preferences.
              </p>

              <p>Try it in cities like:</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <Link
                  href="/blog/seasonal-day-trips-new-york"
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors city-link"
                >
                  <span className="font-medium text-blue-700 dark:text-blue-300">Day trips from New York</span>
                </Link>
                <Link
                  href="/blog/budget-friendly-barcelona"
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors city-link"
                >
                  <span className="font-medium text-blue-700 dark:text-blue-300">Things to do in Barcelona</span>
                </Link>
                <Link
                  href="/blog/perfect-day-in-paris"
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors city-link"
                >
                  <span className="font-medium text-blue-700 dark:text-blue-300">Explore Paris in a day</span>
                </Link>
                <Link
                  href="/blog/hidden-gems-of-hawaii"
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors city-link"
                >
                  <span className="font-medium text-blue-700 dark:text-blue-300">Hidden gems in Hawaii</span>
                </Link>
              </div>

              <hr className="my-8" />

              <h2 className="text-2xl font-bold mt-10 mb-4">🧠 FAQs</h2>

              <div className="space-y-6 my-6">
                <div>
                  <p className="font-semibold">Is DayTrips.ai free to use?</p>
                  <p>Yes—100% free with no sign-up required.</p>
                </div>
                <div>
                  <p className="font-semibold">Can I plan a day trip near my current location?</p>
                  <p>Absolutely. Just enter your city or neighborhood, and we'll generate ideas nearby.</p>
                </div>
                <div>
                  <p className="font-semibold">Does it work internationally?</p>
                  <p>Yes! Whether you're in the U.S., Europe, Asia, or anywhere else, DayTrips.ai works globally.</p>
                </div>
              </div>

              <hr className="my-8" />

              <h2 className="text-2xl font-bold mt-10 mb-4">🔗 Ready to Plan Your Perfect Day Trip?</h2>

              <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl border border-blue-100 dark:border-blue-800 shadow-md">
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-4">
                    Visit{" "}
                    <a
                      href="https://daytrips.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline cta-link"
                    >
                      DayTrips.ai
                    </a>{" "}
                    now and create your AI-generated day trip itinerary in under 60 seconds.
                  </h3>

                  <ul className="flex flex-wrap justify-center gap-4 mb-6">
                    <li className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-green-500 rounded-full">
                        ✓
                      </span>
                      <span>No account</span>
                    </li>
                    <li className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-green-500 rounded-full">
                        ✓
                      </span>
                      <span>No planning stress</span>
                    </li>
                    <li className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-green-500 rounded-full">
                        ✓
                      </span>
                      <span>Just your perfect day—made smarter</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Viator CTA Button */}
            <div className="my-10 p-6 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-xl border border-teal-100 dark:border-teal-800 shadow-md">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300 mb-2">
                    Book Your Travel Experience
                  </h3>
                  <p className="text-teal-700 dark:text-teal-400 max-w-md">
                    Find the best tours, activities, and attractions for your trip. Secure your spot and skip the lines!
                  </p>
                </div>
                <a
                  href="https://www.viator.com/?pid=P00244457&mcid=42383&medium=link"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 no-highlight"
                >
                  Explore Tours & Activities
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Written by</p>
                <p className="font-medium">Emma Roberts</p>
              </div>
              <div>
                {/* Add social share buttons at the bottom of the article */}
                <SocialShareButtons title="Plan the Perfect Day Trip Instantly with DayTrips.ai – Your AI-Powered Travel Assistant" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
