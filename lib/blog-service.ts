export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  readingTime: number
  coverImage?: string
  location?: string
  tags?: string[]
}

// Update the blogPosts array by adding the new travel blog post at the beginning of the array
export const blogPosts: BlogPost[] = [
  {
    slug: "ultimate-travel-blog-best-places-world",
    title: "🌍 The Ultimate Travel Blog: Explore the Best Places in the World + Book Local Tours Instantly",
    excerpt:
      "Discover breathtaking destinations from the Amalfi Coast to Kyoto, with insider tips and curated Viator tours to help you craft your perfect escape.",
    content: `
    <p>Curated by DayTrips.ai<br>Your passport to inspiration, powered by Viator</p>

    <p>From bucket-list landmarks to intimate local experiences, travel offers a chance to reset, rediscover, and reimagine the world. Whether you're planning a honeymoon in Italy, a solo trip to Japan, or a bucket-list adventure in Iceland, this guide is filled with insider details and curated tours to help you craft your perfect escape.</p>

    <p>🎒 Start exploring Viator experiences around the globe<br>
    🔗 <a href="https://www.viator.com?pid=P00244457&mcid=56757&medium=affiliate" target="_blank" rel="noopener noreferrer sponsored">https://www.viator.com?pid=P00244457&mcid=56757&medium=affiliate</a></p>

    <h2>🇮🇹 Amalfi Coast, Italy</h2>

    <h3>A Cliffside Wonderland of Lemon Groves, Villas & Sea Spray</h3>
    <p>Region: Campania, Southern Italy<br>
    Best for: Romantic getaways, scenic drives, culinary travel, luxury retreats<br>
    Peak Season: May–September</p>

    <p>The Amalfi Coast is Italy at its most enchanting. Think dramatic cliff-hugging roads, pastel-hued towns spilling into the sea, and terraced lemon groves perfuming the air. From Sorrento to Ravello, this UNESCO World Heritage Site is packed with breathtaking views and authentic Italian charm.</p>

    <h3>What to See and Do:</h3>

    <ul>
      <li>Visit Positano, a vertical town with cascading staircases, boutique shops, and beach clubs tucked between cliffs.</li>
      <li>Sail to Capri for its famous Blue Grotto, sea stacks, and designer-lined streets.</li>
      <li>Drive the legendary Strada Statale 163, stopping for espresso in tiny villages like Praiano or Minori.</li>
      <li>Savor local specialties like spaghetti alle vongole and limoncello made from Amalfi lemons.</li>
    </ul>

    <p>🛥️ <strong>Featured Tour:</strong><br>
    Capri and Blue Grotto Full-Day Boat Trip with Swimming Stops & Drinks</p>

    <ul>
      <li>Swim in secluded coves</li>
      <li>Visit hidden sea caves</li>
      <li>Enjoy a glass of Prosecco on deck</li>
    </ul>

    <p>🔗 Book here:<br>
    <a href="https://www.viator.com/Amalfi-Coast/d946-ttd?pid=P00244457&mcid=56757&medium=affiliate" target="_blank" rel="noopener noreferrer sponsored">https://www.viator.com/Amalfi-Coast/d946-ttd?pid=P00244457&mcid=56757&medium=affiliate</a></p>

    <h2>🇯🇵 Kyoto, Japan</h2>

    <h3>The Cultural Heart of Japan—Ancient, Serene, and Sublime</h3>
    <p>Region: Kansai, Central Honshu<br>
    Best for: Cultural heritage, temple-hopping, food lovers, spiritual retreats<br>
    Peak Seasons: March–April (sakura), October–November (fall foliage)</p>

    <p>Once the imperial capital of Japan for over a thousand years, Kyoto is a city rooted in tradition and serenity. With more than 1,600 temples and shrines, Kyoto is a haven for those seeking connection—with culture, nature, and inner stillness.</p>

    <h3>What to See and Do:</h3>

    <ul>
      <li>Walk the torii-lined paths of Fushimi Inari Shrine, one of the most iconic and spiritual places in Japan.</li>
      <li>Explore Arashiyama Bamboo Grove, a whispering forest that feels otherworldly.</li>
      <li>Discover the hidden beauty of Kiyomizu-dera, perched above a hillside of cherry trees.</li>
      <li>Dine at Nishiki Market, where Kyoto's culinary roots shine in dishes like yuba (tofu skin), matcha sweets, and grilled river eel.</li>
    </ul>

    <p>🍵 <strong>Featured Tour:</strong><br>
    Private Japanese Tea Ceremony in a Traditional Machiya Townhouse</p>

    <ul>
      <li>Learn the meditative ritual of matcha preparation</li>
      <li>Gain insight into Kyoto's refined hospitality traditions</li>
    </ul>

    <p>🔗 Book here:<br>
    <a href="https://www.viator.com/Kyoto/d332-ttd?pid=P00244457&mcid=56757&medium=affiliate" target="_blank" rel="noopener noreferrer sponsored">https://www.viator.com/Kyoto/d332-ttd?pid=P00244457&mcid=56757&medium=affiliate</a></p>

    <h2>🇮🇸 Reykjavik, Iceland</h2>

    <h3>Where Fire Meets Ice—Geothermal Wonders and Arctic Majesty</h3>
    <p>Region: Capital Region, Iceland<br>
    Best for: Adventure seekers, natural wonders, photographers<br>
    Best Time to Visit: June–August (for road trips), November–March (Northern Lights)</p>

    <p>Iceland's surreal landscapes are a result of millions of years of volcanic activity, glaciers, and tectonic drama. Reykjavík, the capital, is a gateway to this geological playground and a surprisingly vibrant hub of Nordic art, food, and nightlife.</p>

    <h3>What to See and Do:</h3>

    <ul>
      <li>Explore the Golden Circle, a famous loop featuring Thingvellir National Park, the Strokkur geyser, and Gullfoss waterfall.</li>
      <li>Soak in the Blue Lagoon, a warm geothermal spa surrounded by lava fields.</li>
      <li>Chase the Northern Lights during the winter months with a night tour.</li>
      <li>Hike across glaciers or snorkel between tectonic plates at Silfra fissure.</li>
    </ul>

    <p>❄️ <strong>Featured Tour:</strong><br>
    Golden Circle Full-Day Tour with Kerid Crater and Blue Lagoon Entry</p>

    <ul>
      <li>Small-group format</li>
      <li>Expert geological commentary</li>
      <li>Option to upgrade to Northern Lights add-on</li>
    </ul>

    <p>🔗 Book here:<br>
    <a href="https://www.viator.com/Reykjavik/d905-ttd?pid=P00244457&mcid=56757&medium=affiliate" target="_blank" rel="noopener noreferrer sponsored">https://www.viator.com/Reykjavik/d905-ttd?pid=P00244457&mcid=56757&medium=affiliate</a></p>

    <h2>🇲🇦 Marrakech, Morocco</h2>

    <h3>A Living Tapestry of Color, Spice, and Storytelling</h3>
    <p>Region: Marrakesh-Safi<br>
    Best for: Culture lovers, foodies, photographers, market explorers<br>
    Best Time to Visit: March–May & September–November</p>

    <p>Marrakech is a city that engages all five senses. From the ancient call to prayer rising over the medina to the scent of saffron and rose water, it's a city of deep traditions and mesmerizing contrasts.</p>

    <h3>What to See and Do:</h3>

    <ul>
      <li>Wander the Jemaa el-Fnaa square for snake charmers, musicians, and night markets.</li>
      <li>Take a guided tour of the Medina, exploring its souks, spice markets, and historic riads.</li>
      <li>Visit Majorelle Garden, once owned by Yves Saint Laurent.</li>
      <li>Head to the Agafay Desert for a glamping experience surrounded by lunar landscapes.</li>
    </ul>

    <p>🐪 <strong>Featured Tour:</strong><br>
    Luxury Agafay Desert Overnight with Camel Ride, Dinner & Berber Music</p>

    <ul>
      <li>Ideal for romantic or cultural experiences</li>
      <li>Authentic Moroccan cuisine</li>
      <li>Evening campfire performance</li>
    </ul>

    <p>🔗 Book here:<br>
    <a href="https://www.viator.com/Marrakech/d5408-ttd?pid=P00244457&mcid=56757&medium=affiliate" target="_blank" rel="noopener noreferrer sponsored">https://www.viator.com/Marrakech/d5408-ttd?pid=P00244457&mcid=56757&medium=affiliate</a></p>

    <h2>🌐 Bonus Destinations for Bold Travelers</h2>

    <h3>🇲🇽 Oaxaca, Mexico</h3>
    <p>A cultural and culinary capital where Indigenous heritage, mole sauces, mezcal tastings, and ancient Zapotec ruins converge.<br>
    🔗 <a href="https://www.viator.com/Oaxaca/d50491-ttd?pid=P00244457&mcid=56757&medium=affiliate" target="_blank" rel="noopener noreferrer sponsored">https://www.viator.com/Oaxaca/d50491-ttd?pid=P00244457&mcid=56757&medium=affiliate</a></p>

    <h3>🇬🇪 Tbilisi, Georgia</h3>
    <p>This emerging European gem combines Persian bathhouses, Soviet architecture, hip wine bars, and a wildly underrated food scene.<br>
    🔗 <a href="https://www.viator.com/Tbilisi/d22772-ttd?pid=P00244457&mcid=56757&medium=affiliate" target="_blank" rel="noopener noreferrer sponsored">https://www.viator.com/Tbilisi/d22772-ttd?pid=P00244457&mcid=56757&medium=affiliate</a></p>

    <h3>🇫🇴 Faroe Islands</h3>
    <p>A windswept archipelago between Norway and Iceland, the Faroe Islands are pure cinematic drama—think sheep-covered cliffs and waterfalls cascading into the ocean.<br>
    🔗 <a href="https://www.viator.com/Torshavn/d50298-ttd?pid=P00244457&mcid=56757&medium=affiliate" target="_blank" rel="noopener noreferrer sponsored">https://www.viator.com/Torshavn/d50298-ttd?pid=P00244457&mcid=56757&medium=affiliate</a></p>

    <h2>🧳 Travel Better: Smart Tips for 2025 Adventures</h2>

    <ul>
      <li>Book early for popular tours to secure spots in small groups.</li>
      <li>Use Viator filters to find tours with "Free cancellation" and "Likely to sell out."</li>
      <li>Travel insurance is essential, especially when visiting remote or outdoor-heavy destinations.</li>
      <li>Be flexible with travel dates to find better prices and fewer crowds.</li>
    </ul>

    <h2>✈️ Let DayTrips.ai Be Your Global Guide</h2>

    <p>This blog is more than a collection of destinations—it's a springboard to adventure. By booking with Viator through our curated affiliate links, you're supporting high-quality content and gaining access to trusted, reviewed, and local-led tours around the world.</p>

    <p>🔗 Ready to explore all Viator destinations?<br>
    <a href="https://www.viator.com?pid=P00244457&mcid=56757&medium=affiliate" target="_blank" rel="noopener noreferrer sponsored">https://www.viator.com?pid=P00244457&mcid=56757&medium=affiliate</a></p>
    `,
    date: "April 3, 2025",
    author: "Emma Roberts",
    readingTime: 10,
    location: "Global",
    tags: ["Travel", "Destinations", "Tours", "Viator", "Italy", "Japan", "Iceland", "Morocco"],
    coverImage: "/images/daytripsai.png",
  },
  {
    slug: "ultimate-day-trip-mystic-connecticut",
    title: "The Ultimate Day Trip to Mystic, Connecticut",
    excerpt: "Plan the perfect day trip to Mystic, CT with this complete itinerary.",
    content: `
    <p>Looking for a perfect New England escape? Whether you're coming from Boston, Providence, or NYC, <strong>Mystic, Connecticut</strong> offers a unique blend of history, waterfront charm, and amazing food — all in one walkable town.</p>
    `,
    date: "April 30, 2025",
    author: "Emma Roberts",
    readingTime: 6,
    location: "Mystic, Connecticut",
    tags: ["Mystic", "Connecticut", "Day Trips", "Travel Guide", "New England"],
    coverImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day%20trips%20in%20Mystic%2C%20Connecticut-kypbaS2uWqNfGUP8Q4kyJYZ7bAn0lE.jpeg",
  },
  {
    slug: "plan-perfect-day-trip-with-ai",
    title: "Plan the Perfect Day Trip Instantly with DayTrips.ai – Your AI-Powered Travel Assistant",
    excerpt:
      "Looking for things to do near you or in a new city? DayTrips.ai is your go-to AI day trip planner that creates personalized itineraries based on your interests, budget, and schedule.",
    content: `
    <p>Looking for things to do near you or in a new city? Want to explore somewhere without spending hours on research? <strong>DayTrips.ai</strong> is your go-to <strong>AI day trip planner</strong>—perfect for travelers, families, couples, and locals alike.</p>

    <p>In just a few clicks, you'll get a <strong>custom day trip itinerary</strong> based on your location, time, interests, and budget.</p>
    `,
    date: "April 25, 2025",
    author: "Emma Roberts",
    readingTime: 5,
    location: "Global",
    tags: ["AI Travel", "Day Trips", "Travel Planning", "Itinerary", "Travel Tech"],
    coverImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mantas-hesthaven-_g1WdcKcV3w-unsplash-2.jpg-z2m0bl5IqnRkSO9HSz1N6qwYTPt9bB.jpeg",
  },
  {
    slug: "save-on-caribbean-cruise-excursions",
    title: "🌴 How to Save on Excursions When Cruising in the Caribbean",
    excerpt:
      "Learn how to save up to 60% on Caribbean cruise excursions by using Viator and DayTrips.ai. Plan smarter, skip the cruise line markups, and get the most from your ports of call.",
    content: `
    <p><strong>Brought to you by DayTrips.ai – Your Smart Cruise Companion</strong></p>

    <p>There's no better way to experience the Caribbean than on a cruise—multiple destinations, breathtaking ocean views, and exotic adventures all in one trip. But here's a money-saving secret cruise lines don't advertise: <strong>you could be overpaying by 30-60% for excursions when you book through them</strong>.</p>
    `,
    date: "April 20, 2025",
    author: "Emma Roberts",
    readingTime: 6,
    location: "Caribbean",
    tags: ["Caribbean", "Cruise", "Travel Tips", "Budget Travel", "Excursions", "Viator"],
    coverImage: "/images/caribbean-cruise-port.png",
  },
  {
    slug: "seattle-ballooning-family-adventure",
    title: "DayTrip.ai Spotlight: Soaring High with Seattle Ballooning – A Family-Owned Adventure Like No Other",
    excerpt:
      "Discover Seattle Ballooning, a family-owned hot air balloon adventure company offering breathtaking views of Mount Rainier and the Pacific Northwest landscape.",
    content: `
  <p>At DayTrip.ai, we love uncovering unique experiences that take your breath away—sometimes literally. This week, we're taking you sky-high with Seattle Ballooning, a family-owned excursion company that turns your Pacific Northwest bucket list into reality.</p>
  `,
    date: "April 15, 2025",
    author: "Emma Roberts",
    readingTime: 4,
    location: "Seattle, Washington",
    tags: ["Seattle", "Hot Air Balloon", "Adventure", "Family Business", "Pacific Northwest"],
  },
  {
    slug: "one-day-adventure-big-island-hawaii",
    title: "One Day Adventure Around the Big Island: The Ultimate Hawaii Itinerary",
    excerpt:
      "Experience the best of Hawaii's Big Island in just one day with our comprehensive itinerary covering beaches, waterfalls, volcanoes, and local cuisine from sunrise to sunset.",
    content: `
    <p>The Big Island of Hawaii is a paradise of diverse landscapes, from pristine beaches and lush rainforests to active volcanoes and starlit mountain peaks. While most visitors spend a week exploring this magnificent island, it's possible to experience many of its highlights in a single, well-planned day. This ambitious itinerary takes you on a full circle tour around the island, showcasing the best of what Hawaii has to offer.</p>
    `,
    date: "April 10, 2025",
    author: "Emma Roberts",
    readingTime: 8,
    location: "Big Island, Hawaii",
    tags: ["Hawaii", "Big Island", "Day Trips", "Travel Guide", "Volcanoes"],
  },
  {
    slug: "perfect-day-trip-savannah-georgia",
    title: "A Perfect Day Trip to Savannah, Georgia: History, Charm & Southern Flavor",
    excerpt:
      "Discover the ultimate day trip to Savannah, Georgia with our guide to historic sites, charming streets, and Southern cuisine. Plan your perfect Savannah adventure today!",
    content: `
    <p>If you're looking for a destination that blends Southern charm, rich history, and picture-perfect streets, <strong>Savannah, Georgia</strong> needs to be at the top of your list. Whether you're in town for a full vacation or just passing through on a weekend escape, Savannah delivers one of the most walkable, photo-worthy, and food-filled day trips in the South.</p>
    `,
    date: "April 5, 2025",
    author: "Emma Roberts",
    readingTime: 5,
    location: "Savannah, Georgia",
    tags: ["Savannah", "Georgia", "Day Trips", "Travel Guide", "Southern Charm"],
  },
  {
    slug: "santa-cruz-day-trip-from-san-francisco",
    title: "Santa Cruz Day Trip from San Francisco: Redwoods, Surf, and Boardwalk Fun",
    excerpt:
      "Discover the ultimate Santa Cruz day trip from San Francisco or Silicon Valley. Explore redwoods, beaches, and the iconic boardwalk. Book unforgettable experiences via Viator.",
    content: `
    <p>Need a quick escape from the city? Just 75 miles south of San Francisco lies Santa Cruz, California — a vibrant coastal town packed with natural beauty, adrenaline-pumping surf, towering redwoods, and a nostalgic boardwalk that never gets old. It's one of the best day trips from both San Francisco and Silicon Valley, offering something for everyone.</p>
    
    <p>Book your Santa Cruz adventure here on Viator</p>
    
    <h2>Things to Do on a Santa Cruz Day Trip</h2>
    
    <p>Here's how to make the most of one epic day in Santa Cruz:</p>
    
    <h3>1. Morning: Hike Among the Redwoods at Henry Cowell Redwoods State Park</h3>
    
    <p>Start your day with a serene walk through towering coastal redwoods just 10 minutes from downtown. This peaceful escape offers flat trails and amazing photo ops.</p>
    `,
    date: "March 28, 2025",
    author: "Emma Roberts",
    readingTime: 5,
    location: "Santa Cruz, California",
    tags: ["Santa Cruz", "San Francisco", "Day Trips", "California", "Boardwalk", "Redwoods"],
  },
  {
    slug: "how-to-explore-dubai-on-a-budget",
    title: "How to Explore Dubai on a Budget: The Ultimate One-Day Itinerary",
    excerpt:
      "Discover how to experience Dubai's top attractions, stunning views, and cultural gems without breaking the bank with our budget-friendly one-day itinerary.",
    content: `
    <p>Dubai is known for its luxury, skyscrapers, and lavish experiences, but did you know you can enjoy the city without breaking the bank? With the right planning, you can experience Dubai's top attractions, stunning views, and cultural gems—all on a budget.</p>
    
    <p>Whether you're a backpacker, a solo traveler, or just looking to save money, this one-day budget itinerary will show you how to see the best of Dubai for less!</p>
`,
    date: "March 25, 2025",
    author: "Emma Roberts",
    readingTime: 7,
    location: "Dubai, UAE",
    tags: ["Dubai", "Budget Travel", "Day Trips", "Travel Guide", "UAE"],
  },
  {
    slug: "perfect-one-day-itinerary-newport-rhode-island",
    title: "The Perfect One-Day Itinerary for Newport, Rhode Island",
    excerpt:
      "Discover the best of Newport, Rhode Island in just one day with this curated itinerary featuring historic mansions, coastal walks, sailing adventures, and world-class dining.",
    content: `
    <p>Looking for a perfect day trip to Newport, Rhode Island? Whether you're a history buff, foodie, beach lover, or adventure seeker, Newport offers stunning coastal views, historic mansions, and world-class dining—all in one compact and walkable city.</p>
    
    <p>With this one-day itinerary, you'll experience the best of Newport, from breathtaking ocean walks to luxury yacht tours. Best of all, you can book top-rated experiences in Newport instantly with this curated selection.</p>
  `,
    date: "March 20, 2025",
    author: "Emma Roberts",
    readingTime: 6,
    location: "Newport, Rhode Island",
    tags: ["Newport", "Rhode Island", "Day Trips", "Travel Guide", "Coastal Getaway"],
  },
  {
    slug: "hidden-gems-of-hawaii",
    title: "Hidden Gems of Hawaii: Beyond the Tourist Trails",
    excerpt:
      "Discover the secret spots and lesser-known attractions across the Hawaiian islands that most tourists never see.",
    content: `
  <p>Hawaii is famous for its stunning beaches, volcanic landscapes, and lush tropical forests. While popular spots like Waikiki Beach and the Road to Hana deserve their fame, there's a whole other side to Hawaii that many visitors never experience.</p>
  
  <h2>The Big Island's Secret Beaches</h2>
  <p>On the Kona coast, Makalawena Beach requires a 20-minute hike across a lava field, but rewards visitors with pristine white sand and crystal-clear waters. Often, you'll have large stretches of this paradise entirely to yourself.</p>
  
  <h2>Lanai's Garden of the Gods</h2>
  <p>This otherworldly landscape of red rock formations looks more like Mars than Hawaii. The unusual terrain was created by centuries of erosion, and local legend says the rocks were dropped from the sky by the gods.</p>
`,
    date: "February 28, 2025",
    author: "Kai Malino",
    readingTime: 7,
    location: "Hawaii, USA",
    tags: ["Hawaii", "Hidden Gems", "Beaches", "Nature"],
  },
  {
    slug: "perfect-day-in-paris",
    title: "The Perfect Day in Paris: A Local's Itinerary",
    excerpt:
      "Skip the tourist traps and experience Paris like a local with this carefully crafted day trip itinerary that balances iconic sights with hidden gems.",
    content: `
  <p>Paris, the City of Light, is filled with iconic landmarks, charming streets, and incredible food. While many visitors rush from one attraction to the next, a perfect day in Paris should balance sightseeing, relaxation, and authentic experiences. Here's an itinerary that captures the magic of Paris from a local's perspective, ensuring a memorable and stress-free day.</p>
  
  <h2>Morning: A Classic Parisian Start</h2>
  <p>Start your day around 9:00 AM in the historic Le Marais district. Begin with a croissant and coffee at a local boulangerie like "Au Petit Versailles du Marais." Wander through the narrow medieval streets, popping into the small boutiques and art galleries that open around 10:00 AM.</p>
`,
    date: "February 15, 2025",
    author: "Sophie Dubois",
    readingTime: 6,
    location: "Paris, France",
    tags: ["Paris", "France", "City Guide", "Local Experience"],
  },
  {
    slug: "budget-friendly-barcelona",
    title: "Barcelona on a Budget: Affordable Day Trip Guide",
    excerpt:
      "Experience the best of Barcelona without breaking the bank with our comprehensive guide to free attractions, affordable eats, and money-saving tips.",
    content: `
<p>Barcelona is a vibrant city known for its stunning architecture, rich history, and delicious cuisine. While it has a reputation for being a top European destination, exploring the city and its surroundings doesn't have to break the bank. Whether you're a solo traveler, a couple, or a family looking for affordable adventures, here's a guide to budget-friendly day trips from Barcelona that will give you an unforgettable experience without overspending.</p>
`,
    date: "January 25, 2025",
    author: "Miguel Fernandez",
    readingTime: 7,
    location: "Barcelona, Spain",
    tags: ["Barcelona", "Spain", "Budget Travel", "Travel Tips"],
  },
  {
    slug: "family-friendly-day-trips-london",
    title: "5 Family-Friendly Day Trips from London",
    excerpt:
      "Discover perfect day trip destinations near London that will keep both kids and adults entertained, from magical castles to wildlife adventures.",
    content: `
  <p>London is a fantastic family destination in its own right, but the surrounding areas offer incredible day trip opportunities that children and adults alike will love. Here are five family-friendly destinations within easy reach of the capital.</p>
  
  <h2>1. Warner Bros. Studio Tour: The Making of Harry Potter</h2>
  <p>Located in Leavesden, just 20 miles northwest of London, this magical experience brings the wizarding world to life. Families can explore authentic sets like the Great Hall, Diagon Alley, and Platform 9¾, see original costumes and props, and discover the special effects behind the beloved films.</p>
`,
    date: "January 12, 2025",
    author: "Emma Thompson",
    readingTime: 8,
    location: "London, UK",
    tags: ["London", "Family Travel", "Day Trips", "UK"],
  },
  {
    slug: "seasonal-day-trips-new-york",
    title: "Seasonal Day Trips from New York City: Where to Go Each Season",
    excerpt:
      "Discover the perfect day trips from NYC for every season, from spring cherry blossoms to winter ski resorts, all within a few hours of the city.",
    content: `
  <p>New York City is a hub of excitement, but sometimes you just need a quick escape to recharge. Fortunately, the areas surrounding NYC offer seasonal delights that make for perfect day trips. Here's where to go during each season of the year.</p>
  
  <h2>Spring: Botanical Gardens and Blossom Festivals</h2>
  
  <h3>Brooklyn Botanic Garden</h3>
  <p>While technically still in NYC, this 52-acre garden is a world away from the city bustle. In spring, the Cherry Esplanade explodes with pink blossoms, celebrated during the annual Sakura Matsuri festival. The garden also features a Japanese hill-and-pond garden, rose garden, and native flora collection.</p>
`,
    date: "December 5, 2024",
    author: "Daniel Rodriguez",
    readingTime: 9,
    location: "New York, USA",
    tags: ["New York", "Seasonal Travel", "Day Trips", "USA"],
    coverImage: "/images/day-trips-nyc.jpeg",
  },
]

// Static functions that don't use async/await
export function getBlogPosts(): BlogPost[] {
  return blogPosts
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return blogPosts.find((post) => post.slug === slug) || null
}
