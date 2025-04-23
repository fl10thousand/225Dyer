import Image from "next/image"

export function Header() {
  return (
    <header className="w-full bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-24 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202019-07-17%20at%2010.26.32%20AM-KPKyqYoGqWvKxupiNkGHt5ZTNpUomk.png"
              alt="POINT 225"
              width={180}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  )
}
