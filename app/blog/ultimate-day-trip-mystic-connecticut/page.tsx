import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, MapPin } from "lucide-react"
import ViatorBanner from "@/components/viator-banner"
import { SocialShareButtons } from "@/components/social-share-buttons"

export default function MysticConnecticutBlogPost() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/50 py-12 md:py-24">
      <div className="container max-w-[calc(4xl-140px)] mx-auto px-4 sm:px-6 xl:pr-36">
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
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              🌊 The Ultimate Day Trip to Mystic, Connecticut: A 1-Day Itinerary + Cost Breakdown
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                April 30, 2025
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />6 min read
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Mystic, Connecticut
              </span>
            </div>

            <div className="mt-4">
              <SocialShareButtons title="The Ultimate Day Trip to Mystic, Connecticut: A 1-Day Itinerary + Cost Breakdown" />
            </div>
          </div>

          <div className="relative h-[400px] w-full mb-10 rounded-xl overflow-hidden">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20Mystic%2C%20Connecticut-kypbaS2uWqNfGUP8Q4kyJYZ7bAn0lE.jpeg"
              alt="Mystic, Connecticut waterfront"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-4 sm:mb-0">
              <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300">Mystic, CT Travel Deals</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Exclusive offers on attractions, tours and experiences in Mystic
              </p>
            </div>
            <a
              href="https://www.viator.com/Mystic/d23483-ttd?pid=P00244457&mcid=56757&medium=affiliate"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 inline-flex items-center"
            >
              Mystic Deals
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <div className="bg-blue-50/30 dark:bg-blue-900/10 p-4 rounded-lg border-l-4 border-blue-500 dark:border-blue-400">
              <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                <strong>Keywords:</strong> Mystic CT itinerary, day trip to Mystic Connecticut, Mystic Seaport tickets,
                Mystic Aquarium admission, things to do in Mystic CT
              </p>
            </div>

            <p className="text-lg leading-relaxed">
              Looking for a perfect New England escape? Whether you're coming from Boston, Providence, or NYC,{" "}
              <strong>Mystic, Connecticut</strong> offers a unique blend of history, waterfront charm, and amazing food
              — all in one walkable town. This complete itinerary helps you plan an unforgettable day trip with full
              pricing and booking options via Viator.
            </p>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-2">
                🕗 8:00 AM – Depart for Mystic, CT
              </h2>
              <ul className="space-y-2 list-disc pl-6">
                <li>
                  <strong>From Providence:</strong> 1 hour
                </li>
                <li>
                  <strong>From Boston:</strong> 2 hours
                </li>
                <li>
                  <strong>Train Option:</strong> Amtrak Northeast Regional to Mystic Station
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-2">
                ☕ 9:00 AM – Breakfast at Mystic Depot Roasters
              </h2>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <p>
                  <strong>📍 Address:</strong> 2 Roosevelt Ave, Mystic, CT
                  <br />
                  <strong>💰 Cost:</strong> $12–$15
                  <br />
                  <strong>🕐 Duration:</strong> 45 minutes
                </p>
              </div>
              <p>
                This cozy café inside a restored train station offers house-brewed coffee and tasty breakfast sandwiches
                — the perfect fuel to kick off your Mystic experience.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-2">
                ⚓ 10:00 AM – Mystic Seaport Museum
              </h2>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <p>
                  <strong>📍 Address:</strong> 75 Greenmanville Ave, Mystic, CT
                  <br />
                  <strong>💰 Cost:</strong> $32 per adult
                  <br />
                  <strong>🕐 Duration:</strong> 2–2.5 hours
                </p>
              </div>
              <p>
                Explore the largest maritime museum in the U.S. Climb aboard historic ships, walk through a recreated
                19th-century village, and watch traditional shipbuilding demonstrations.
              </p>
              <p>
                <a
                  href="https://www.viator.com/Mystic/d23483-ttd?pid=P00244457&mcid=56757&medium=affiliate"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  🔗 Book Mystic Seaport Admission on Viator
                </a>
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-2">
                🍽️ 1:00 PM – Lunch at The Shipwright's Daughter
              </h2>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <p>
                  <strong>📍 Address:</strong> 20 East Main St, Mystic, CT
                  <br />
                  <strong>💰 Cost:</strong> $25–$30
                  <br />
                  <strong>🕐 Duration:</strong> 1 hour
                </p>
              </div>
              <p>
                Enjoy a sustainable, farm-to-table lunch at one of Mystic's top-rated restaurants. Expect coastal
                flavors, elegant plating, and locally sourced ingredients.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-2">🐳 2:30 PM – Mystic Aquarium</h2>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <p>
                  <strong>📍 Address:</strong> 55 Coogan Blvd, Mystic, CT
                  <br />
                  <strong>💰 Cost:</strong> ~$40 (dynamic pricing)
                  <br />
                  <strong>🕐 Duration:</strong> 1.5–2 hours
                </p>
              </div>
              <p>
                Visit beluga whales, African penguins, and sea lions at one of New England's most iconic aquariums.
                Educational and fun for all ages.
              </p>
              <p>
                <a
                  href="https://www.mysticaquarium.org/day-planner/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  🔗 Plan Your Visit to Mystic Aquarium
                </a>
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-2">
                🛍️ 4:30 PM – Shop Olde Mistick Village
              </h2>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <p>
                  <strong>📍 Address:</strong> 27 Coogan Blvd, Mystic, CT
                  <br />
                  <strong>💰 Cost:</strong> Free (plan $10–$30 for purchases)
                  <br />
                  <strong>🕐 Duration:</strong> 1–1.5 hours
                </p>
              </div>
              <p>
                Explore 40+ quaint shops in this open-air village. Pick up local gifts, enjoy fudge samples, and grab a
                coffee while taking in colonial-style architecture.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-2">
                🍷 6:00 PM – Dinner at Engine Room
              </h2>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <p>
                  <strong>📍 Address:</strong> 14 Holmes St, Mystic, CT
                  <br />
                  <strong>💰 Cost:</strong> $25–$35
                  <br />
                  <strong>🕐 Duration:</strong> 1 hour
                </p>
              </div>
              <p>
                A rustic industrial-style restaurant known for dry-aged burgers, smoked meats, and craft cocktails.
                Don't miss their famous Mac & Cheese or bourbon list.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-2">
                🌅 7:30 PM – Sunset Walk at Mystic River Park
              </h2>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <p>
                  <strong>📍 Address:</strong> Cottrell St, Mystic, CT
                  <br />
                  <strong>💰 Cost:</strong> Free
                  <br />
                  <strong>🕐 Duration:</strong> 30 minutes
                </p>
              </div>
              <p>
                Enjoy views of the Mystic River and Drawbridge as the sun sets over the marina. A perfect way to reflect
                on your adventure.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-2">
                💸 Total Estimated Budget (Per Adult)
              </h2>
              <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Estimated Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Breakfast</td>
                      <td className="px-6 py-4 whitespace-nowrap">$15</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Mystic Seaport Admission</td>
                      <td className="px-6 py-4 whitespace-nowrap">$32</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Lunch</td>
                      <td className="px-6 py-4 whitespace-nowrap">$25</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Aquarium Admission</td>
                      <td className="px-6 py-4 whitespace-nowrap">$40</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Shopping</td>
                      <td className="px-6 py-4 whitespace-nowrap">$15</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Dinner</td>
                      <td className="px-6 py-4 whitespace-nowrap">$30</td>
                    </tr>
                    <tr className="font-bold bg-gray-50 dark:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">Total</td>
                      <td className="px-6 py-4 whitespace-nowrap">$157</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-2">
                ✅ Travel Tips for Mystic, CT
              </h2>
              <ul className="space-y-2 list-disc pl-6">
                <li>Best time to visit: May–October</li>
                <li>Parking: Free/metered parking available near most attractions</li>
                <li>Bring: Walking shoes, sunscreen, water, layered clothing, and a camera</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-2">
                ✨ Book Mystic Activities in Advance
              </h2>
              <p>
                Want to lock in your itinerary and support this site? Use our affiliate link below to book top Mystic
                experiences via Viator — with no added cost to you!
              </p>
              <p>
                <a
                  href="https://www.viator.com/Mystic/d23483-ttd?pid=P00244457&mcid=56757&medium=affiliate"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  <strong>🔗 Explore Mystic on Viator Now</strong>
                </a>
              </p>
            </div>

            <p className="text-lg font-medium border-t pt-6">
              Thanks for reading! Have questions about Mystic or want help planning your next trip? Drop a comment
              below!
            </p>
          </div>

          <div className="my-10 p-6 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl border border-blue-100 dark:border-blue-800 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">Book Your Mystic Experience</h3>
                <p className="text-blue-700 dark:text-blue-400 max-w-md">
                  Find the best tours, activities, and attractions for your trip. Secure your spot and skip the lines!
                </p>
              </div>
              <a
                href="https://www.viator.com/Mystic/d23483-ttd?pid=P00244457&mcid=56757&medium=affiliate"
                target="_blank"
                rel="noreferrer noopener"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Mystic Tours & Activities
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
              <SocialShareButtons title="The Ultimate Day Trip to Mystic, Connecticut: A 1-Day Itinerary + Cost Breakdown" />
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
