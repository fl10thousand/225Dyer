import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Travel Merchandise | DayTrips.ai",
  description: "Discover our curated collection of travel essentials, gear, and accessories for your next adventure.",
  keywords: ["travel merchandise", "travel gear", "travel accessories", "travel essentials", "travel gifts"],
  openGraph: {
    title: "Travel Merchandise | DayTrips.ai",
    description: "Discover our curated collection of travel essentials, gear, and accessories for your next adventure.",
    url: "https://daytrips.ai/merch",
    type: "website",
  },
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  isNew?: boolean
  isBestseller?: boolean
  isOnSale?: boolean
}

const products: Product[] = [
  {
    id: "compact-travel-backpack",
    name: "Compact Travel Backpack",
    description: "Lightweight, water-resistant backpack with multiple compartments perfect for day trips.",
    price: 59.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/travel-backpack.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
    category: "bags",
    rating: 4.8,
    isBestseller: true,
  },
  {
    id: "quick-dry-travel-towel",
    name: "Quick-Dry Travel Towel",
    description: "Ultra-absorbent, fast-drying microfiber towel that packs down small for any adventure.",
    price: 24.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/travel-towel.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
    category: "accessories",
    rating: 4.6,
  },
  {
    id: "universal-travel-adapter",
    name: "Universal Travel Adapter",
    description: "All-in-one adapter with USB ports compatible with outlets in 150+ countries.",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/travel-adapter.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
    category: "electronics",
    rating: 4.7,
    isOnSale: true,
  },
  {
    id: "collapsible-water-bottle",
    name: "Collapsible Water Bottle",
    description: "Silicone bottle that folds down when empty to save space in your bag.",
    price: 19.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/water-bottle.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
    category: "accessories",
    rating: 4.5,
  },
  {
    id: "travel-journal",
    name: "Travel Journal",
    description: "Premium leather-bound journal with sections for itineraries, memories, and photos.",
    price: 34.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/travel-journal.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
    category: "accessories",
    rating: 4.9,
    isBestseller: true,
  },
  {
    id: "packing-cubes-set",
    name: "Packing Cubes Set",
    description: "Set of 5 compression packing cubes to organize and maximize luggage space.",
    price: 32.99,
    originalPrice: 44.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/packing-cubes.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
    category: "organization",
    rating: 4.8,
    isOnSale: true,
  },
  {
    id: "travel-pillow-eye-mask",
    name: "Memory Foam Travel Pillow & Eye Mask",
    description: "Ergonomic neck pillow with matching 3D contoured eye mask for comfortable rest.",
    price: 39.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/travel-pillow.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
    category: "comfort",
    rating: 4.6,
  },
  {
    id: "portable-luggage-scale",
    name: "Portable Luggage Scale",
    description: "Compact digital scale to weigh your luggage before heading to the airport.",
    price: 14.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/luggage-scale.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
    category: "accessories",
    rating: 4.4,
  },
  {
    id: "travel-tech-organizer",
    name: "Travel Tech Organizer",
    description: "Compact case for organizing cables, chargers, earbuds, and small electronics.",
    price: 24.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tech-organizer.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
    category: "organization",
    rating: 4.7,
  },
  {
    id: "daytrips-logo-tshirt",
    name: "DayTrips.ai Logo T-Shirt",
    description: "Soft, comfortable cotton t-shirt featuring our logo. Perfect for your travel adventures.",
    price: 24.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-tshirt.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
    category: "apparel",
    rating: 4.8,
    isNew: true,
  },
  {
    id: "rfid-travel-wallet",
    name: "RFID-Blocking Travel Wallet",
    description: "Secure wallet with RFID protection for cards and passport, plus multiple compartments.",
    price: 29.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/travel-wallet.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
    category: "accessories",
    rating: 4.5,
  },
  {
    id: "adventure-awaits-cap",
    name: "Adventure Awaits Cap",
    description: "Adjustable cotton cap with embroidered 'Adventure Awaits' design. One size fits most.",
    price: 19.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/adventure-cap.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
    category: "apparel",
    rating: 4.6,
    isNew: true,
  },
]

export default function MerchPage() {
  // For demo purposes, we'll use placeholder images
  const placeholderImage = (width: number, height: number, text: string) =>
    `/placeholder.svg?height=${height}&width=${width}&text=${encodeURIComponent(text)}`

  // Group products by category
  const categories = Array.from(new Set(products.map((product) => product.category)))

  return (
    <iframe
      style={{ borderRadius: "24px", border: "none" }}
      src="https://embed.creator-spring.com/widget?slug=my-store-106ab74&per=20&currency=&page=1&layout=grid-sm-4&theme=light"
      title="my-store-106ab74 Merch store powered by Spring"
      width="100%"
      height="960"
      data-reactroot=""
    ></iframe>
  )
}

function ProductCard({
  product,
  placeholderImage,
}: {
  product: Product
  placeholderImage: (width: number, height: number, text: string) => string
}) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <img
          src={
            product.image ||
            placeholderImage(400, 300, `${product.name || "/placeholder.svg"} - ${product.price.toFixed(2)}`)
          }
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
        />
        {product.isNew && <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600 text-white">New</Badge>}
        {product.isBestseller && (
          <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600 text-white">Bestseller</Badge>
        )}
        {product.isOnSale && (
          <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white">Sale</Badge>
        )}
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <div className="flex items-center gap-1 mt-1">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">{product.rating}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <Button className="group">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
