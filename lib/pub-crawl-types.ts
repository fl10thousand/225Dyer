export interface PubCrawlPreferences {
  location: string
  beerType: string[]
  pubCount: number
  duration: number
}

export interface PubStop {
  name: string
  address: string
  description?: string
  imageUrl?: string
  website?: string
  mapLink?: string
  recommendedBeer: string
  beerDescription?: string
  type?: string
}

export interface PubCrawlPlan {
  title: string
  location: string
  date: string
  summary: string
  duration: number
  stops: PubStop[]
}
