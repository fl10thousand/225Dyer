export function AboutSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-[#63666A] mb-6">About 225 Dyer Street</h2>
            <p className="text-lg text-gray-600 mb-4">
              225 Dyer Street is more than just a building; it's a hub of innovation and collaboration in the heart of Providence's Innovation and Design District.
            </p>
            <p className="text-lg text-gray-600">
              Our state-of-the-art facility offers modern workspaces, cutting-edge amenities, and a vibrant community of forward-thinking professionals.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="/placeholder.svg?height=400&width=600" 
              alt="225 Dyer Street Building" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
