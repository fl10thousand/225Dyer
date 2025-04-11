import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Star } from "lucide-react"

interface ProductProps {
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

export default function MerchProductCard({ product }: { product: ProductProps }) {
  // For demo purposes, we'll use placeholder images if the image URL is not available
  const placeholderImage = (width: number, height: number, text: string) =>
    `/placeholder.svg?height=${height}&width=${width}&text=${encodeURIComponent(text)}`

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
