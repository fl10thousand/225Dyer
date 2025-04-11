"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import TripGeneratorForm from "@/components/trip-generator-form"
import { Globe, ShoppingBag, Car, Plane } from "lucide-react"
import { useEffect, useState, Suspense } from "react"
import { Badge } from "@/components/ui/badge"
import ViatorBanner from "@/components/viator-banner"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="flex flex-col items-center">
      <section
        className="w-full py-6 md:py-12 lg:py-24 relative"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/getty-images-hjwgzvyirvE-unsplash.jpg-Bl2aixar0Yg5ZjalpRJjnG5uoqMMh9.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
        aria-label="Couple looking at a map by a fountain in a European city square"
        role="img"
      >
        {/* Add a visually hidden description for screen readers */}
        <span className="sr-only">Couple looking at a map by a fountain in a European city square</span>
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/40 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>
        <div className="container px-4 md:px-6 py-4 md:py-0 relative z-10">
          <div className="max-w-2xl mx-auto md:mx-0">
            <div
              className={`flex flex-col space-y-2 text-center md:text-left transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                  <span className="text-white text-shadow-lg">Discover Perfect Day Trips</span>{" "}
                  <span className="text-shadow-enhanced block mt-1 sm:inline sm:mt-0" style={{ color: "#66C0FF" }}>
                    Anywhere in the World
                  </span>
                </h1>
                <p className="mx-auto md:mx-0 max-w-[700px] text-white font-medium text-base md:text-xl text-shadow-md backdrop-blur-[2px] bg-black/10 p-2 rounded-md mt-3">
                  Tell us your interests and location — we'll instantly build your perfect day trip.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start mt-5 flex-wrap">
                <Button
                  asChild
                  size="lg"
                  className="text-base md:text-lg px-6 md:px-10 py-5 md:py-7 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 bg-gradient-to-r from-primary to-primary/90 font-medium animate-[pulse_2s_infinite] hover:animate-none relative before:absolute before:inset-0 before:rounded-full before:bg-primary/30 before:animate-[ping_3s_infinite] before:opacity-70"
                >
                  <a href="#generator">Create Your Day Trip</a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="bg-white/20 backdrop-blur-sm border-white border-2 text-white shadow-md px-6 md:px-10 py-5 md:py-7 text-base md:text-lg font-medium transition-all duration-300 hover:bg-white/30 hover:scale-105 hover:shadow-lg flex items-center gap-2"
                >
                  <Link href="/find-trip">
                    <Car className="h-5 w-5" />
                    Road Trip
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="bg-white/20 backdrop-blur-sm border-white border-2 text-white shadow-md px-6 md:px-10 py-5 md:py-7 text-base md:text-lg font-medium transition-all duration-300 hover:bg-white/30 hover:scale-105 hover:shadow-lg"
                >
                  <Link href="/pub-crawl">Pub Crawl</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative w-full">
        <div className="absolute right-0 z-50 hidden lg:block" style={{ top: "0" }}>
          <ViatorBanner />
        </div>
      </div>

      <section id="generator" className="container px-4 py-12 md:px-6 mb-24">
        <div className="mx-auto max-w-[800px]">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Generate Your Perfect Day Trip
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Globe className="h-5 w-5 text-highlight-blue" />
              <p className="text-highlight-blue font-medium">Available for any destination worldwide</p>
            </div>
            <p className="mt-4 text-muted-foreground">
              Fill in your preferences and our AI will create a personalized itinerary for you, no matter where you want
              to explore.
            </p>
          </div>
          <Suspense fallback={<div className="h-[400px] flex items-center justify-center">Loading form...</div>}>
            <TripGeneratorForm />
          </Suspense>
        </div>
      </section>

      <section className="w-full py-16 md:py-32 -mt-16 md:-mt-12 mb-8 md:mb-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center">
          <div className="text-center mb-12 w-full max-w-3xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <Car className="h-6 w-6 text-primary" />
              <Plane className="h-6 w-6 text-primary" />
              <Badge className="bg-primary hover:bg-primary/90 text-white text-sm py-1 px-3">NEW</Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Travel Deals & Recommendations</h2>
            <p className="text-muted-foreground mx-auto">
              Exclusive offers, travel merchandise, and discounts for your next adventure, handpicked by our travel
              experts.
            </p>
          </div>

          <div className="flex justify-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Experiences */}
              <a
                href="https://expedia.com/affiliate/D9t3zuT"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full h-full sm:col-span-2 lg:col-span-1"
              >
                <div
                  className="flex flex-col items-center h-[280px] text-center group p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden cursor-pointer transform hover:scale-105 w-full"
                  style={{
                    backgroundImage:
                      "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20hawaii.jpg-z5e9JNMDaPoY05XspOf6BRIZJeucWB.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Add an overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-colors duration-300"></div>
                  {/* Make content relative to appear above the overlay */}
                  <div className="relative z-10 flex flex-col items-center justify-between h-full w-full">
                    <div className="space-y-2 transition-all duration-300 group-hover:translate-y-1 pt-4">
                      <h3 className="text-xl font-bold text-white">Book your experience</h3>
                      <p className="text-white/80">
                        Discover unforgettable tours, activities, and unique experiences for your next adventure.
                      </p>
                    </div>
                    <span className="inline-flex items-center text-white font-bold mt-2 group-hover:underline transition-all duration-300 transform group-hover:translate-x-1 pb-4">
                      Browse Experiences
                      <svg
                        className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>

              {/* Sponsored Hotel Deals */}
              <a
                href="https://expedia.com/affiliate/D9t3zuT"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full h-full"
              >
                <div
                  className="flex flex-col items-center h-[280px] text-center group p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden cursor-pointer transform hover:scale-105 w-full"
                  style={{
                    backgroundImage:
                      "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Day%20trips%20hotels.jpg-6MUqsnfkShaHM1rqbEeeVUmatwHp59.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Add an overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-colors duration-300"></div>
                  {/* Make content relative to appear above the overlay */}
                  <div className="relative z-10 flex flex-col items-center justify-between h-full w-full">
                    <div className="space-y-2 transition-all duration-300 group-hover:translate-y-1 pt-4">
                      <h3 className="text-xl font-bold text-white">Hotel Deals</h3>
                      <p className="text-white/80">
                        Save up to 40% on hotels worldwide with our exclusive partner offers.
                      </p>
                    </div>
                    <span className="inline-flex items-center text-white font-bold mt-2 group-hover:underline transition-all duration-300 transform group-hover:translate-x-1 pb-4">
                      View Deals
                      <svg
                        className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>

              {/* Sponsored Flight Deals */}
              <a
                href="https://expedia.com/affiliate/D9t3zuT"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full h-full"
              >
                <div
                  className="flex flex-col items-center h-[280px] text-center group p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden cursor-pointer transform hover:scale-105 w-full"
                  style={{
                    backgroundImage:
                      "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20flights.jpg-YvQYpzCsSkKfN7UjLtJooMiZ3ZOIzs.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Add an overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-colors duration-300"></div>
                  {/* Make content relative to appear above the overlay */}
                  <div className="relative z-10 flex flex-col items-center justify-between h-full w-full">
                    <div className="space-y-2 transition-all duration-300 group-hover:translate-y-1 pt-4">
                      <h3 className="text-xl font-bold text-white">Flight Discounts</h3>
                      <p className="text-white/80">
                        Exclusive flight deals to popular destinations. Book now and save!
                      </p>
                    </div>
                    <span className="inline-flex items-center text-white font-bold mt-2 group-hover:underline transition-all duration-300 transform group-hover:translate-x-1 pb-4">
                      Find Flights
                      <svg
                        className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>

              {/* Rental Cars */}
              <a
                href="https://expedia.com/affiliate/D9t3zuT"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full h-full"
              >
                <div
                  className="flex flex-col items-center h-[280px] text-center group p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden cursor-pointer transform hover:scale-105 w-full"
                  style={{
                    backgroundImage:
                      "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20rental%20cars.jpg-yVPyhgl0fP0Xw6TT7Ul3QkYC8oi82C.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Add an overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-colors duration-300"></div>
                  {/* Make content relative to appear above the overlay */}
                  <div className="relative z-10 flex flex-col items-center justify-between h-full w-full">
                    <div className="space-y-2 transition-all duration-300 group-hover:translate-y-1 pt-4">
                      <h3 className="text-xl font-bold text-white">Rental Cars</h3>
                      <p className="text-white/80">
                        Find the best deals on rental cars worldwide. Compare prices and book instantly.
                      </p>
                    </div>
                    <span className="inline-flex items-center text-white font-bold mt-2 group-hover:underline transition-all duration-300 transform group-hover:translate-x-1 pb-4">
                      Find a Car
                      <svg
                        className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="text-center text-xs text-muted-foreground mt-10">Advertisements • Sponsored Content</div>
        </div>
      </section>
    </div>
  )
}
