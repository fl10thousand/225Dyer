"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ShoppingBag, Star, Truck, Check, Heart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// This would typically come from a database or API
const products = [
  {
    id: "compact-travel-backpack",
    name: "Compact Travel Backpack",
    description: "Lightweight, water-resistant backpack with multiple compartments perfect for day trips.",
    longDescription: `
      <p>Our Compact Travel Backpack is the perfect companion for your day trips and urban adventures. Designed with travelers in mind, this backpack combines functionality, style, and comfort.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li>Lightweight yet durable water-resistant nylon material</li>
        <li>Ergonomic padded shoulder straps and back panel for all-day comfort</li>
        <li>Multiple compartments including a padded laptop sleeve (fits up to 15")</li>
        <li>Hidden anti-theft pocket for valuables</li>
        <li>Side water bottle pockets</li>
        <li>Front quick-access pocket for essentials</li>
        <li>Compression straps to maintain a slim profile</li>
        <li>Capacity: 22L</li>
        <li>Weight: 1.2 lbs</li>
      </ul>
      
      <p>Whether you're exploring a new city, hiking a scenic trail, or just commuting to work, this versatile backpack has you covered. The thoughtful organization keeps your gear accessible, while the sleek design ensures you look good on the go.</p>
      
      <p>Available in Midnight Black, Navy Blue, and Forest Green.</p>
    `,
    price: 59.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/travel-backpack.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
    gallery: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/travel-backpack-1.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/travel-backpack-2.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/travel-backpack-3.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
    ],
    category: "bags",
    rating: 4.8,
    reviewCount: 124,
    isBestseller: true,
    inStock: true,
    colors: ["Black", "Navy", "Green"],
    relatedProducts: ["quick-dry-travel-towel", "collapsible-water-bottle", "travel-tech-organizer"],
  },
  {
    id: "quick-dry-travel-towel",
    name: "Quick-Dry Travel Towel",
    description: "Ultra-absorbent, fast-drying microfiber towel that packs down small for any adventure.",
    longDescription: `
      <p>Never be caught without a towel again! Our Quick-Dry Travel Towel is the ultimate solution for travelers, hikers, and beach-goers who need a compact, efficient towel that won't take up precious luggage space.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li>Ultra-absorbent microfiber material absorbs 5x its weight in water</li>
        <li>Dries 3x faster than conventional cotton towels</li>
        <li>Antimicrobial treatment prevents odors and mildew</li>
        <li>Packs down to 1/4 the size of a regular towel</li>
        <li>Soft and gentle on skin</li>
        <li>Includes compact mesh carrying case with hanging loop</li>
        <li>Size: 30" x 60" (Large)</li>
        <li>Weight: 8 oz</li>
      </ul>
      
      <p>Perfect for backpacking, camping, beach days, gym sessions, or any travel adventure. This versatile towel will quickly become an essential part of your packing list.</p>
      
      <p>Available in Aqua Blue, Sunset Orange, and Mountain Gray.</p>
    `,
    price: 24.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/travel-towel.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
    gallery: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/travel-towel-1.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/travel-towel-2.jpg-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9",
    ],
    category: "accessories",
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    colors: ["Blue", "Orange", "Gray"],
    relatedProducts: ["compact-travel-backpack", "collapsible-water-bottle", "packing-cubes-set"],
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params
  const product = products.find((p) => p.id === id) || products[0] // Fallback to first product if not found
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(product.image)
  const { toast } = useToast()

  // For demo purposes, we'll use placeholder images if the image URL is not available
  const placeholderImage = (width: number, height: number, text: string) =>
    `/placeholder.svg?height=${height}&width=${width}&text=${encodeURIComponent(text)}`

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} (${selectedColor}) added to your cart.`,
    })
  }

  const handleBuyNow = () => {
    toast({
      title: "Proceeding to checkout",
      description: "This would normally take you to the checkout page.",
    })
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/50 py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <Button variant="ghost" asChild className="mb-8 group">
          <Link href="/merch" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to All Products
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
              <img
                src={activeImage || placeholderImage(600, 600, product.name)}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-auto pb-2">
              <button
                onClick={() => setActiveImage(product.image)}
                className={`relative aspect-square overflow-hidden rounded-md border ${
                  activeImage === product.image ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-primary/50"
                }`}
              >
                <img
                  src={product.image || placeholderImage(100, 100, "Main")}
                  alt={`${product.name} - Main`}
                  className="h-full w-full object-cover"
                />
              </button>
              {product.gallery?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-square overflow-hidden rounded-md border ${
                    activeImage === img ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-primary/50"
                  }`}
                >
                  <img
                    src={img || placeholderImage(100, 100, `Gallery ${index + 1}`)}
                    alt={`${product.name} - Gallery ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
                </div>
                {product.isBestseller && (
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-white">Bestseller</Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-primary" />
              <span>Free shipping on orders over $50</span>
            </div>

            <div className="space-y-4">
              {product.colors && (
                <div>
                  <h3 className="font-medium mb-2">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1 rounded-md border ${
                          selectedColor === color
                            ? "bg-primary text-primary-foreground"
                            : "bg-background hover:bg-muted"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-l-md border flex items-center justify-center hover:bg-muted"
                  >
                    -
                  </button>
                  <div className="h-10 w-12 border-t border-b flex items-center justify-center">{quantity}</div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 rounded-r-md border flex items-center justify-center hover:bg-muted"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="secondary" className="flex-1" onClick={handleBuyNow}>
                Buy Now
              </Button>
              <Button size="lg" variant="outline" className="sm:flex-none">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Add to Wishlist</span>
              </Button>
            </div>

            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="font-medium">In Stock</span>
                {product.inStock ? (
                  <Badge variant="outline" className="ml-auto">
                    Ready to Ship
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 ml-auto">
                    Pre-order
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Free returns within 30 days</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>1-year warranty</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent data-[state=active]:bg-transparent py-3 text-muted-foreground data-[state=active]:text-foreground"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent data-[state=active]:bg-transparent py-3 text-muted-foreground data-[state=active]:text-foreground"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent data-[state=active]:bg-transparent py-3 text-muted-foreground data-[state=active]:text-foreground"
              >
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <div
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: product.longDescription }}
              />
            </TabsContent>
            <TabsContent value="specifications" className="pt-6">
              <Card className="border-0 shadow-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-lg mb-2">Materials</h3>
                      <p className="text-muted-foreground">
                        Premium water-resistant nylon with reinforced stitching and YKK zippers
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Dimensions</h3>
                      <p className="text-muted-foreground">18" x 12" x 6" (H x W x D)</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Weight</h3>
                      <p className="text-muted-foreground">1.2 lbs (0.54 kg)</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-lg mb-2">Capacity</h3>
                      <p className="text-muted-foreground">22 liters</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Care Instructions</h3>
                      <p className="text-muted-foreground">
                        Hand wash with mild soap and water. Air dry. Do not machine wash or tumble dry.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Warranty</h3>
                      <p className="text-muted-foreground">1-year limited warranty against manufacturing defects</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold">{product.rating}</div>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{product.reviewCount} reviews</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-2">
                        <div className="text-sm w-2">{star}</div>
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{
                              width: `${
                                star === 5 ? "70%" : star === 4 ? "20%" : star === 3 ? "7%" : star === 2 ? "2%" : "1%"
                              }`,
                            }}
                          ></div>
                        </div>
                        <div className="text-sm text-muted-foreground w-10">
                          {star === 5 ? "70%" : star === 4 ? "20%" : star === 3 ? "7%" : star === 2 ? "2%" : "1%"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium text-lg mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    {[
                      {
                        name: "Sarah T.",
                        rating: 5,
                        date: "2 months ago",
                        comment:
                          "This backpack is perfect for day trips! It's lightweight but surprisingly spacious. I can fit everything I need for a day of exploring, including my camera, water bottle, snacks, and an extra layer. The hidden pocket is great for keeping valuables secure.",
                      },
                      {
                        name: "Michael R.",
                        rating: 4,
                        date: "3 months ago",
                        comment:
                          "Great backpack overall. The quality is excellent and it's very comfortable to wear all day. I only wish it had a dedicated sunglasses holder on the strap. Otherwise, it's perfect for my needs.",
                      },
                      {
                        name: "Jessica L.",
                        rating: 5,
                        date: "1 month ago",
                        comment:
                          "I've taken this backpack on three trips now and it's held up beautifully. The water resistance works well in light rain, and I love how it doesn't look like a typical tourist backpack. Highly recommend!",
                      },
                    ].map((review, index) => (
                      <div key={index} className="border-b pb-6 last:border-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{review.name}</div>
                            <div className="flex mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">{review.date}</div>
                        </div>
                        <p className="mt-3 text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {product.relatedProducts && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.relatedProducts.map((relatedId) => {
                const relatedProduct = products.find((p) => p.id === relatedId)
                if (!relatedProduct) return null

                return (
                  <Card
                    key={relatedId}
                    className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] flex flex-col h-full"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      <img
                        src={
                          relatedProduct.image ||
                          placeholderImage(
                            400,
                            300,
                            `${relatedProduct.name || "/placeholder.svg"} - ${relatedProduct.price.toFixed(2)}`,
                          )
                        }
                        alt={relatedProduct.name}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex-grow">
                      <h3 className="font-medium">{relatedProduct.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm">{relatedProduct.rating}</span>
                      </div>
                      <div className="mt-2 font-bold">${relatedProduct.price.toFixed(2)}</div>
                    </div>
                    <div className="p-4 pt-0">
                      <Button asChild className="w-full">
                        <Link href={`/merch/${relatedProduct.id}`}>View Product</Link>
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
