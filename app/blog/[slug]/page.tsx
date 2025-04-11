import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, MapPin } from "lucide-react"
import type { Metadata } from "next"
import { getBlogPostBySlug } from "@/lib/blog-service"
import ViatorBanner from "@/components/viator-banner"
import { SocialShareButtons } from "@/components/social-share-buttons"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | DayTrips.ai Blog",
      description: "The blog post you're looking for doesn't exist or may have been moved.",
    }
  }

  // Determine the image URL based on the slug or use a default
  const imageUrl =
    post.coverImage ||
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20hero.jpg-BIpmYZa6Uo98TCI6TSUymVlwAreFDV.jpeg"

  return {
    title: `${post.title} | DayTrips.ai Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://daytrips.ai/blog/${params.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  }
}

// Hardcoded blog posts data
const blogPosts = {
  "hidden-gems-of-hawaii": {
    title: "Hidden Gems of Hawaii: Beyond the Tourist Trails",
    excerpt:
      "Discover the secret spots and lesser-known attractions across the Hawaiian islands that most tourists never see.",
    content: `
  <p>Hawaii is famous for its stunning beaches, lush landscapes, and world-class resorts, but beyond the typical tourist hotspots lies a world of hidden treasures waiting to be discovered. If you're looking to experience the islands like a local, venture off the beaten path to uncover breathtaking views, secluded beaches, and cultural gems. Here's your guide to Hawaii's best-kept secrets.</p>

  <h2>Oahu: Beyond Waikiki</h2>

  <h3>1. Ka'ena Point Trail</h3>
  <p>While many visitors flock to Diamond Head, the Ka'ena Point Trail offers a more rugged and untouched coastal hike. This scenic trail leads to the westernmost tip of Oahu, where you can spot Hawaiian monk seals and seabirds while enjoying panoramic ocean views.</p>

  <h3>2. Mermaid Caves</h3>
  <p>Located near Nanakuli Beach Park, the Mermaid Caves are a hidden wonder of lava tubes and sea caves. At low tide, you can enter the caves and witness crystal-clear pools of ocean water shimmering under the sunlight.</p>

  <h3>3. Kualoa Regional Park</h3>
  <p>Skip the crowds at Kualoa Ranch and head to the Kualoa Regional Park for a peaceful picnic with jaw-dropping views of Mokoli'i (Chinaman's Hat) and the Ko'olau Mountains. It's a great spot for kayaking and exploring tide pools.</p>

  <h2>Maui: Secret Spots and Hidden Valleys</h2>

  <h3>4. Red Sand Beach (Kaihalulu Beach)</h3>
  <p>Tucked away in Hana, Red Sand Beach is a striking cove with crimson-colored sand, dramatic cliffs, and blue waters. The hike to this beach is short but steep, so be prepared for an adventure.</p>

  <h3>5. Twin Falls</h3>
  <p>While the Road to Hana is known for its waterfalls, Twin Falls is an often-overlooked gem. Just a short hike from the parking lot, this spot features two cascading falls surrounded by lush rainforest.</p>

  <h3>6. Makawao Town</h3>
  <p>A hidden gem in upcountry Maui, Makawao is a charming town known for its paniolo (Hawaiian cowboy) heritage. Stroll through local art galleries, enjoy fresh pastries at T. Komoda Store & Bakery, and explore the peaceful gardens of Hui No'eau Visual Arts Center.</p>

  <h2>Big Island: Volcanic Wonders and Black Sand Beaches</h2>

  <h3>7. Papakōlea Green Sand Beach</h3>
  <p>One of the rarest beaches in the world, Papakōlea Beach features stunning green sand made from olivine crystals. It requires a rugged 2.5-mile hike (or an optional local shuttle ride), but the unique scenery makes it well worth the effort.</p>

  <h3>8. Pu'uhonua o Hōnaunau National Historical Park</h3>
  <p>For a deep dive into Hawaiian history, visit Pu'uhonua o Hōnaunau, a sacred site once used as a place of refuge for ancient Hawaiians. Wander through reconstructed temples, fishponds, and royal grounds while learning about traditional Hawaiian customs.</p>

  <h3>9. Kaumana Caves</h3>
  <p>Skip the touristy lava tubes and explore Kaumana Caves, a lesser-known lava tube in Hilo. With a flashlight and sturdy shoes, you can venture into the dark tunnels formed by ancient volcanic flows.</p>

  <h2>Kauai: The Garden Isle's Hidden Retreats</h2>

  <h3>10. Secret Beach (Kauapea Beach)</h3>
  <p>Tucked away on the North Shore, Secret Beach is a breathtaking stretch of golden sand with minimal crowds. The short but steep hike down is well worth it for the secluded paradise awaiting you.</p>

  <h3>11. Wailua Falls (Early Morning Visit)</h3>
  <p>While Wailua Falls is well-known, most tourists visit later in the day. Arrive at sunrise to enjoy this magnificent waterfall without the crowds, and you may even see rainbows forming in the mist.</p>

  <h3>12. Maha'ulepu Heritage Trail</h3>
  <p>For a scenic coastal hike, the Maha'ulepu Heritage Trail offers stunning cliffside views, sea caves, and tide pools. This lesser-traveled path showcases Kauai's raw beauty without the usual tourist traffic.</p>

  <h2>Final Tips for Exploring Hawaii's Hidden Gems</h2>

  <ul>
    <li>Respect nature and culture – Many of these spots are sacred or ecologically fragile, so always practice responsible tourism.</li>
    <li>Check conditions – Some trails and beaches can be dangerous depending on tides and weather.</li>
    <li>Go early – Beat the crowds by visiting in the morning for the best experience.</li>
    <li>Ask locals – Some of the best secrets are only known by residents, so don't be afraid to strike up a conversation.</li>
  </ul>

  <p>Hawaii is more than just its famous attractions—it's a place of mystery, adventure, and cultural depth. By exploring these hidden gems, you'll experience the islands in a whole new way, far from the usual tourist trails. So pack your sense of adventure and discover Hawaii's secret wonders!</p>
`,
  },
  "perfect-day-in-paris": {
    title: "The Perfect Day in Paris: A Local's Itinerary",
    excerpt:
      "Skip the tourist traps and experience Paris like a local with this carefully crafted day trip itinerary that balances iconic sights with hidden gems.",
    content: `
  <p>Paris, the City of Light, is filled with iconic landmarks, charming streets, and incredible food. While many visitors rush from one attraction to the next, a perfect day in Paris should balance sightseeing, relaxation, and authentic experiences. Here's an itinerary that captures the magic of Paris from a local's perspective, ensuring a memorable and stress-free day.</p>

  <h2>Morning: A Classic Parisian Start</h2>
  
  <h3>8:00 AM – Breakfast at a Traditional Café</h3>
  <p>Start your day like a true Parisian with a leisurely breakfast at a local café. Grab a table at Café de Flore or Les Deux Magots in Saint-Germain-des-Prés and enjoy a classic croissant with café crème while watching the city wake up.</p>
  
  <h3>9:00 AM – Stroll Along the Seine & Île de la Cité</h3>
  <p>Take a morning walk along the Seine River, soaking in the beauty of the bridges and historic buildings. Head towards Île de la Cité, the heart of medieval Paris, where you can admire the breathtaking Notre-Dame Cathedral (currently under restoration but still a magnificent sight).</p>
  
  <h3>10:00 AM – Visit Sainte-Chapelle</h3>
  <p>A short walk from Notre-Dame, Sainte-Chapelle is a must-visit for its stunning stained-glass windows. Arrive early to avoid long lines and experience the magical light streaming through the 13th-century glass.</p>
  
  <h2>Midday: Art & Hidden Gems</h2>
  
  <h3>11:30 AM – Explore Le Marais</h3>
  <p>Wander through the charming streets of Le Marais, one of Paris's most vibrant districts. Pop into small boutiques, art galleries, and hidden courtyards before visiting the beautiful Place des Vosges, one of the oldest squares in Paris.</p>
  
  <h3>12:30 PM – Lunch at a Local Bistro</h3>
  <p>Stop at Chez Janou, a cozy bistro known for its Provençal cuisine. Try a classic steak frites or a fresh salade niçoise, and don't skip their famous chocolate mousse!</p>
  
  <h2>Afternoon: Iconic Landmarks & Green Spaces</h2>
  
  <h3>2:00 PM – The Louvre or Musée d'Orsay</h3>
  <p>Depending on your artistic preference, choose between:</p>
  <ul>
    <li>The Louvre: Home to the Mona Lisa and countless masterpieces, perfect for history lovers.</li>
    <li>Musée d'Orsay: Showcasing stunning Impressionist works in a grand former railway station, ideal for art enthusiasts.</li>
  </ul>
  
  <h3>4:00 PM – Relax in Jardin des Tuileries</h3>
  <p>After the museum, take a leisurely break in Jardin des Tuileries, the elegant gardens connecting the Louvre to Place de la Concorde. Grab a bench by the fountains and enjoy some people-watching.</p>
  
  <h3>5:00 PM – Montmartre & Sacré-Cœur</h3>
  <p>Take the Metro or a scenic walk to Montmartre, the artistic quarter of Paris. Wander through the Place du Tertre, where local artists paint, before heading up to the Sacré-Cœur Basilica. From here, enjoy one of the best panoramic views of Paris, especially at sunset.</p>
  
  <h2>Evening: Dining & Nighttime Magic</h2>
  
  <h3>7:30 PM – Dinner at a Traditional Parisian Restaurant</h3>
  <p>For an authentic dining experience, head to Bouillon Pigalle, where you'll find classic French dishes at affordable prices. Try the French onion soup, duck confit, or escargots, and pair it with a glass of wine.</p>
  
  <h3>9:30 PM – Eiffel Tower by Night</h3>
  <p>End your perfect day with a visit to the Eiffel Tower. Whether you choose to go up for the view or admire it from Trocadéro Gardens, make sure to be there on the hour when the tower sparkles with golden lights—an unforgettable sight.</p>
  
  <h3>11:00 PM – A Nightcap by the Seine</h3>
  <p>Wrap up your day with a quiet drink along the Seine at Rosa Bonheur sur Seine, a lively barge with great vibes, or simply enjoy a peaceful walk by the water.</p>
  
  <h2>Final Tips for the Perfect Parisian Day:</h2>
  <ul>
    <li>Use public transport – The Metro is fast and efficient, making it easy to hop between neighborhoods.</li>
    <li>Dress comfortably – Paris is best explored on foot, so wear stylish yet comfy shoes.</li>
    <li>Book museum tickets in advance – Save time by pre-booking your entry to major attractions.</li>
    <li>Embrace the slow pace – A true Parisian experience is about enjoying the moment, not rushing!</li>
  </ul>
  
  <p>This itinerary offers the perfect blend of history, culture, and relaxation, ensuring you experience the best of Paris like a local. Whether it's your first visit or a return trip, following this guide will make your day in Paris truly unforgettable!</p>
`,
  },
  "budget-friendly-barcelona": {
    title: "Barcelona on a Budget: Affordable Day Trip Guide",
    excerpt:
      "Experience the best of Barcelona without breaking the bank with our comprehensive guide to free attractions, affordable eats, and money-saving tips.",
    content: `
  <p>Barcelona is a vibrant city known for its stunning architecture, rich history, and delicious cuisine. While it has a reputation for being a top European destination, exploring the city and its surroundings doesn't have to break the bank. Whether you're a solo traveler, a couple, or a family looking for affordable adventures, here's a guide to budget-friendly day trips from Barcelona that will give you an unforgettable experience without overspending.</p>

  <h2>1. Sitges – A Scenic Beach Escape</h2>
  
  <p>Travel Time: 40 minutes by train</p>
  
  <p>A charming seaside town just south of Barcelona, Sitges offers beautiful beaches, a historic old town, and a lively promenade—all without a hefty price tag.</p>
  
  <p><strong>Budget-Friendly Activities:</strong></p>
  
  <ul>
    <li>Relax on the beach – Most beaches in Sitges are free to access, making it a perfect sun-soaked escape.</li>
    <li>Explore the Old Town – Wander through picturesque streets, admire whitewashed buildings, and visit the Church of Sant Bartomeu.</li>
    <li>Pack a picnic – Grab some fresh produce from a local market and enjoy a picnic by the sea.</li>
  </ul>
  
  <h2>2. Montserrat – Breathtaking Mountain Views</h2>
  
  <p>Travel Time: 1 hour by train</p>
  
  <p>One of Catalonia's most iconic landmarks, Montserrat is a must-visit for breathtaking views and cultural experiences, and it can be done on a budget.</p>
  
  <p><strong>Budget-Friendly Activities:</strong></p>
  
  <ul>
    <li>Take the train and cable car – A return ticket from Barcelona to Montserrat costs around €20, offering stunning views on the way up.</li>
    <li>Visit the Montserrat Monastery – Entry is free, allowing you to admire the stunning basilica and the famous Black Madonna.</li>
    <li>Hiking trails – Enjoy free hiking trails with panoramic views of Catalonia.</li>
  </ul>
  
  <h2>3. Tarragona – Roman Ruins by the Sea</h2>
  
  <p>Travel Time: 1 hour by train</p>
  
  <p>Tarragona is a history lover's paradise, offering well-preserved Roman ruins, a charming old town, and beautiful coastal views.</p>
  
  <p><strong>Budget-Friendly Activities:</strong></p>
  
  <ul>
    <li>Visit the Roman Amphitheater – A small entrance fee allows you to explore one of Spain's best-preserved amphitheaters.</li>
    <li>Stroll through the Old Town – Discover medieval alleyways and historic landmarks for free.</li>
    <li>Walk along the Mediterranean Balcony – Enjoy panoramic sea views at no cost.</li>
  </ul>
  
  <h2>4. Girona – A Medieval Fairytale City</h2>
  
  <p>Travel Time: 1.5 hours by train</p>
  
  <p>With its ancient walls, colorful riverfront, and Game of Thrones filming locations, Girona is a fantastic budget-friendly day trip.</p>
  
  <p><strong>Budget-Friendly Activities:</strong></p>
  
  <ul>
    <li>Walk along the medieval walls – Enjoy stunning views of the city for free.</li>
    <li>Explore the Jewish Quarter – One of the best-preserved Jewish quarters in Europe, great for a historical stroll.</li>
    <li>Cross the Eiffel Bridge – Designed by Gustave Eiffel, this picturesque bridge is perfect for photos.</li>
  </ul>
  
  <h2>5. Vic – Traditional Markets and Catalan Culture</h2>
  
  <p>Travel Time: 1.5 hours by train</p>
  
  <p>For an authentic taste of Catalan culture, Vic is an underrated gem with a rich history and lively market scene.</p>
  
  <p><strong>Budget-Friendly Activities:</strong></p>
  
  <ul>
    <li>Visit the Vic Market – On Tuesdays and Saturdays, the main square transforms into a bustling market where you can browse local produce and handmade crafts.</li>
    <li>Admire the Cathedral of Vic – Free entry allows you to enjoy stunning art and architecture.</li>
    <li>Explore the Roman Temple – A well-preserved Roman structure dating back to the 2nd century.</li>
  </ul>
  
  <h2>Final Tips for Budget Travel from Barcelona</h2>
  
  <ul>
    <li>Use public transport – Trains and buses are affordable and efficient for day trips.</li>
    <li>Pack your own snacks – Avoid tourist-priced meals by bringing food from local markets.</li>
    <li>Look for free attractions – Many historical sites and museums have free entry on certain days.</li>
  </ul>
  
  <p>Barcelona and its surroundings offer incredible experiences for travelers on a budget. With a little planning, you can enjoy a mix of beach escapes, historical sites, and breathtaking natural beauty—all without overspending. So grab your backpack, hop on a train, and start exploring!</p>
`,
  },
  "family-friendly-day-trips-london": {
    title: "5 Family-Friendly Day Trips from London",
    excerpt:
      "Discover perfect day trip destinations near London that will keep both kids and adults entertained, from magical castles to wildlife adventures.",
    content: `
  <p>London is an incredible city with endless attractions, but sometimes a change of scenery is just what families need. Fortunately, there are plenty of amazing day trips just a short train ride or drive away. Whether you're looking for adventure, history, or wildlife, here are five of the best family-friendly day trips from London.</p>

  <h2>1. Windsor – Royal Fun and History</h2>
  
  <p>Travel Time: 30-40 minutes by train</p>
  
  <p>A visit to Windsor is perfect for families who love history and royal stories. The highlight is Windsor Castle, where kids can marvel at the grand State Apartments, explore St. George's Chapel, and even witness the Changing of the Guard.</p>
  
  <p><strong>Top Attractions:</strong></p>
  
  <ul>
    <li>Windsor Castle – Explore the world's oldest and largest inhabited castle.</li>
    <li>LEGOLAND Windsor Resort – A dream destination for kids with rides, live shows, and LEGO-themed attractions.</li>
    <li>Windsor Great Park – Perfect for a family picnic and a scenic walk.</li>
  </ul>
  
  <h2>2. Brighton – Seaside Fun and Amusements</h2>
  
  <p>Travel Time: 1 hour by train</p>
  
  <p>For a classic British seaside escape, Brighton is an excellent choice. The city is packed with fun activities for all ages, from sandy beach strolls to arcade games on the pier.</p>
  
  <p><strong>Top Attractions:</strong></p>
  
  <ul>
    <li>Brighton Pier – Enjoy family-friendly rides, arcade games, and traditional fish and chips.</li>
    <li>SEA LIFE Brighton – Discover fascinating marine creatures in this historic aquarium.</li>
    <li>British Airways i360 – Take a glass pod 450 feet into the sky for stunning coastal views.</li>
  </ul>
  
  <h2>3. Warner Bros. Studio Tour – The Making of Harry Potter</h2>
  
  <p>Travel Time: 1 hour by train and bus</p>
  
  <p>If your family loves Harry Potter, this magical experience in Leavesden is a must-visit. Walk through the Great Hall, explore Diagon Alley, and see iconic movie props and costumes.</p>
  
  <p><strong>Top Attractions:</strong></p>
  
  <ul>
    <li>Hogwarts Express – Board the famous train at Platform 9¾.</li>
    <li>Forbidden Forest – Encounter magical creatures from the films.</li>
    <li>Butterbeer Café – Enjoy a frothy Butterbeer after your tour.</li>
  </ul>
  
  <h2>4. Cambridge – Punting and Science Museums</h2>
  
  <p>Travel Time: 1 hour by train</p>
  
  <p>Cambridge is a charming university town filled with beautiful scenery and interactive attractions that kids will love.</p>
  
  <p><strong>Top Attractions:</strong></p>
  
  <ul>
    <li>Punting on the River Cam – Enjoy a relaxing boat ride through historic colleges.</li>
    <li>Cambridge Science Centre – Hands-on exhibits and fun experiments for young scientists.</li>
    <li>Fitzwilliam Museum – A free museum with art, history, and ancient artifacts.</li>
  </ul>
  
  <h2>5. Whipsnade Zoo – A Wildlife Adventure</h2>
  
  <p>Travel Time: 1.5 hours by train and bus</p>
  
  <p>For a day filled with animal encounters, Whipsnade Zoo is the perfect choice. Run by the Zoological Society of London, this open-air zoo is home to over 3,500 animals, including elephants, lions, and penguins.</p>
  
  <p><strong>Top Attractions:</strong></p>
  
  <ul>
    <li>Elephant Herd – One of the largest elephant enclosures in the UK.</li>
    <li>Safari Bus – Hop on a ride through the zoo's expansive grounds.</li>
    <li>Children's Farm – Meet and feed friendly farm animals.</li>
  </ul>
  
  <h2>Plan Your Perfect Family Day Out!</h2>
  
  <p>Each of these destinations offers something unique and exciting for families looking to escape London for the day. Whether you prefer castles, beaches, magic, or wildlife, these trips guarantee unforgettable experiences for kids and adults alike. So pack your bags, grab the family, and set off on your next adventure!</p>
`,
  },
  "seasonal-day-trips-new-york": {
    title: "Seasonal Day Trips from New York City: Where to Go Each Season",
    excerpt:
      "Discover the perfect day trips from NYC for every season, from spring cherry blossoms to winter ski resorts, all within a few hours of the city.",
    content: `
  <p>New York City is a hub of excitement, but sometimes you just need a quick escape to recharge. Fortunately, NYC is surrounded by stunning destinations perfect for day trips. Whether you're chasing blooming flowers in spring, beach waves in summer, vibrant foliage in fall, or a snowy retreat in winter, there's a perfect getaway for every season. Here's your ultimate guide to seasonal day trips from New York City.</p>
  
  <h2>Spring: Bask in Blooms and Gardens</h2>
  
  <h3>Storm King Art Center – New Windsor, NY</h3>
  <p>As the weather warms up and flowers begin to bloom, head to Storm King Art Center, a 500-acre outdoor sculpture park in the Hudson Valley. Wander through fields dotted with massive contemporary sculptures while enjoying the fresh air and budding greenery.</p>
  
  <h3>Brooklyn Botanic Garden – Brooklyn, NY</h3>
  <p>You don't even have to leave the city to experience spring's full glory. The Brooklyn Botanic Garden comes alive with its famous Cherry Blossom Festival (Sakura Matsuri). Stroll through a sea of pink petals and explore themed Japanese gardens.</p>
  
  <h3>Philadelphia, PA</h3>
  <p>A quick train ride to Philly lets you enjoy spring blooms at Longwood Gardens, home to over 1,000 acres of stunning horticultural displays. While you're there, grab a Philly cheesesteak and explore the city's historic sites.</p>
  
  <h2>Summer: Beaches, Waterfalls, and Outdoor Fun</h2>
  
  <h3>Fire Island, NY</h3>
  <p>For a quintessential summer day trip, hop on a ferry to Fire Island. This car-free paradise offers pristine beaches, charming boardwalks, and relaxed island vibes—perfect for sunbathing, swimming, and biking.</p>
  
  <h3>Cold Spring, NY</h3>
  <p>Escape the summer heat by heading to Cold Spring, a quaint riverside town along the Hudson River. Hike Breakneck Ridge for breathtaking views or explore Main Street's antique shops and waterfront restaurants.</p>
  
  <h3>The Hamptons, NY</h3>
  <p>For a luxurious seaside escape, take a trip to The Hamptons. Enjoy the pristine beaches, visit wineries, or explore Montauk's lighthouse. Whether you're relaxing in East Hampton or socializing in Southampton, summer in The Hamptons is unbeatable.</p>
  
  <h2>Fall: Foliage and Harvest Festivals</h2>
  
  <h3>Sleepy Hollow, NY</h3>
  <p>Embrace autumn's spooky charm in Sleepy Hollow, home to Washington Irving's famous legend. Visit Sleepy Hollow Cemetery, the Great Jack O'Lantern Blaze, and scenic Rockefeller State Park for a perfect fall outing.</p>
  
  <h3>Bear Mountain State Park, NY</h3>
  <p>Just an hour north of NYC, Bear Mountain offers some of the best fall foliage in the region. Hike the Perkins Memorial Tower Trail, visit the Bear Mountain Zoo, or enjoy a scenic drive along Seven Lakes Drive.</p>
  
  <h3>Hudson Valley Wine Trail, NY</h3>
  <p>Autumn is prime time for vineyard visits. Explore the Hudson Valley Wine Trail, where you can sip local wines, stroll through picturesque vineyards, and enjoy farm-to-table dining with mountain views in the background.</p>
  
  <h2>Winter: Cozy Retreats and Snowy Adventures</h2>
  
  <h3>Lake Placid, NY</h3>
  <p>For a true winter wonderland experience, take a trip to Lake Placid, a former Olympic host city in the Adirondacks. Enjoy skiing, ice skating on Mirror Lake, or cozying up in a lodge with a cup of hot cocoa.</p>
  
  <h3>New Paltz & Mohonk Mountain House, NY</h3>
  <p>For a more relaxed winter escape, visit New Paltz and the historic Mohonk Mountain House. Go ice skating, snowshoeing, or simply enjoy the stunning lake views from this castle-like resort.</p>
  
  <h3>Rockaway Beach, NY</h3>
  <p>Even in winter, Rockaway Beach is worth a visit. Take a peaceful, chilly walk along the beach, warm up at a local café, and enjoy the quiet, off-season charm of this seaside escape.</p>
  
  <h2>Plan Your Perfect Seasonal Escape</h2>
  
  <p>Each season brings a new opportunity to explore the incredible destinations surrounding New York City. Whether you're looking for an adventure, relaxation, or cultural experiences, these day trips offer the perfect getaway just a short journey from the Big Apple. So grab your bag, hop on a train or car, and discover a new favorite seasonal retreat!</p>
`,
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Get the post data from our hardcoded object
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  // If post doesn't exist, this will be handled by the not-found.tsx page
  if (!post) {
    return null
  }

  // Add this function before the return statement
  function sanitizeHtmlContent(content: string): string {
    // Remove any potential full HTML document structure
    let sanitized = content

    // Remove doctype if present
    sanitized = sanitized.replace(/<!DOCTYPE[^>]*>/i, "")

    // Remove html, head, and body tags if present
    sanitized = sanitized.replace(/<html[^>]*>|<\/html>/gi, "")
    sanitized = sanitized.replace(/<head[^>]*>.*?<\/head>/gis, "")
    sanitized = sanitized.replace(/<body[^>]*>|<\/body>/gi, "")

    return sanitized.trim()
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

            {/* Add social share buttons below the post metadata */}
            <div className="mt-4">
              <SocialShareButtons title={post.title} />
            </div>
          </div>

          <div className="relative h-[400px] w-full mb-10 rounded-xl overflow-hidden">
            {params.slug === "hidden-gems-of-hawaii" ? (
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20hawaii.jpg-z5e9JNMDaPoY05XspOf6BRIZJeucWB.jpeg"
                alt="Beautiful Hawaiian beach at sunset with palm trees and vibrant orange sky"
                className="object-cover w-full h-full"
              />
            ) : params.slug === "perfect-day-in-paris" ? (
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20paris.jpg-u4O45icSj7XCwXKMFcOYKYA4uXvSOa.jpeg"
                alt="Sunset view of Paris with the Eiffel Tower and boats on the Seine River"
                className="object-cover w-full h-full"
              />
            ) : params.slug === "budget-friendly-barcelona" ? (
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20Barcelona.jpg-3gZzXKoieCE3tzg5eSgkwF6MJ9xW1k.jpeg"
                alt="Temple of the Sacred Heart of Jesus on Mount Tibidabo in Barcelona"
                className="object-cover w-full h-full"
              />
            ) : params.slug === "family-friendly-day-trips-london" ? (
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20London.jpg-zEmNVF8facXbeWa2w16TUQAXYJWKJq.jpeg"
                alt="Tower Bridge in London with its iconic blue suspension structure spanning the Thames River"
                className="object-cover w-full h-full"
              />
            ) : params.slug === "seasonal-day-trips-new-york" ? (
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20NYC.jpg-W0vWxXVQioarEqU2pC1vcwAOFfRB0y.jpeg"
                alt="Times Square at night with Broadway show advertisements and bright neon lights"
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20tokyo.jpg-cF10uIVIHv7MOjIXVLBQi6q96Fj6xf.jpeg"
                alt={post.title}
                className="object-cover w-full h-full"
              />
            )}
          </div>

          <div>
            {params.slug === "hidden-gems-of-hawaii" && (
              <div className="mb-8 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800 flex flex-col sm:flex-row items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <h4 className="text-lg font-bold text-teal-800 dark:text-teal-300">Hawaii Vacation Deals</h4>
                  <p className="text-sm text-teal-700 dark:text-teal-400">
                    Exclusive offers on resorts, activities and island hopping in Hawaii
                  </p>
                </div>
                <a
                  href="https://trip.tp.st/x79ehecd"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors duration-200 inline-flex items-center"
                  style={{ color: "white" }}
                >
                  Hawaii Deals
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            )}
            {params.slug === "perfect-day-in-paris" && (
              <div className="mb-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 flex flex-col sm:flex-row items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <h4 className="text-lg font-bold text-purple-800 dark:text-purple-300">Paris Travel Deals</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    Exclusive offers on hotels, tours and experiences in the City of Light
                  </p>
                </div>
                <a
                  href="https://trip.tp.st/x79ehecd"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 inline-flex items-center"
                  style={{ color: "white" }}
                >
                  Paris Deals
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            )}
            {params.slug === "budget-friendly-barcelona" && (
              <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <h4 className="text-lg font-bold text-amber-800 dark:text-amber-300">Barcelona Deals</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Exclusive offers on hotels, tours and attractions in Barcelona
                  </p>
                </div>
                <a
                  href="https://trip.tp.st/x79ehecd"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200 inline-flex items-center"
                  style={{ color: "white" }}
                >
                  Barcelona Deals
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            )}
            {params.slug === "family-friendly-day-trips-london" && (
              <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 flex flex-col sm:flex-row items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <h4 className="text-lg font-bold text-green-800 dark:text-green-300">London Deals</h4>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Special offers on attractions, tours and family activities in London
                  </p>
                </div>
                <a
                  href="https://trip.tp.st/x79ehecd"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 inline-flex items-center"
                  style={{ color: "white" }}
                >
                  London Deals
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            )}
            {params.slug === "seasonal-day-trips-new-york" && (
              <div className="mb-8 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg border border-rose-200 dark:border-rose-800 flex flex-col sm:flex-row items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <h4 className="text-lg font-bold text-rose-800 dark:text-rose-300">New York Deals</h4>
                  <p className="text-sm text-rose-700 dark:text-rose-400">
                    Exclusive offers on hotels, attractions and experiences in New York City
                  </p>
                </div>
                <a
                  href="https://www.viator.com/New-York-City/d687-ttd?pid=P00244457&mcid=42383&medium=link"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg transition-colors duration-200 inline-flex items-center"
                  style={{ color: "white" }}
                >
                  New York Deals
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(post.content) }}
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
            />
          </div>

          {/* Viator CTA Button */}
          <div className="my-10 p-6 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-xl border border-teal-100 dark:border-teal-800 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300 mb-2">
                  Book Your {post.location || "Travel"} Experience
                </h3>
                <p className="text-teal-700 dark:text-teal-400 max-w-md">
                  Find the best tours, activities, and attractions for your trip. Secure your spot and skip the lines!
                </p>
              </div>
              <a
                href="https://www.viator.com/?pid=P00244457&mcid=42383&medium=link"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
              <p className="font-medium">{post.author}</p>
            </div>
            <div>
              {/* Add social share buttons at the bottom of the article */}
              <SocialShareButtons title={post.title} />
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
