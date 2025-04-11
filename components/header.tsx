"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { MoonIcon, SunIcon, Menu, ShoppingBag, Car, Beer } from "lucide-react"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSupabase } from "./supabase-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMobile } from "@/hooks/use-mobile"

export default function Header() {
  const { setTheme } = useTheme()
  const isMobile = useMobile()
  const { user, supabase, loading } = useSupabase()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const navigation = [
    { name: "Home", href: "/" },
    { name: "My Trips", href: "/my-trips" },
    { name: "Blog", href: "/blog" },
    { name: "Merch", href: "/merch" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-32 items-center justify-between pr-4">
        <div className="flex items-center gap-8 md:gap-12">
          <Link
            href="/"
            className="hidden md:block"
            style={{
              backgroundImage:
                "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-png-pTuaoQjxdsG0baLxpXpv1n1f4H8QKS.png')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "112px",
              width: "180px",
            }}
            aria-label="DayTrips.ai - Home"
          />

          {!isMobile && (
            <NavigationMenu className="ml-2">
              <NavigationMenuList className="gap-2">
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.isExternal ? (
                      <a
                        href="javascript:void(0)"
                        className={cn(
                          "px-3 py-2 text-sm font-medium transition-colors hover:text-primary flex items-center cursor-not-allowed",
                          "text-primary bg-primary/10 rounded-md",
                        )}
                      >
                        <ShoppingBag className="mr-1 h-4 w-4" />
                        {item.name} (Coming soon)
                      </a>
                    ) : (
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                            pathname === item.href ? "text-primary" : "text-muted-foreground",
                          )}
                        >
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
              <Button asChild variant="outline" className="ml-4 flex items-center gap-2">
                <Link href="/find-trip">
                  <Car className="h-4 w-4" />
                  Road Trip
                </Link>
              </Button>
              <Button asChild variant="outline" className="ml-4 flex items-center gap-2">
                <Link href="/pub-crawl">
                  <Beer className="h-4 w-4" />
                  Pub Crawl
                  <span className="ml-1 text-xs bg-primary/20 text-primary px-1 py-0.5 rounded">Beta</span>
                </Link>
              </Button>
            </NavigationMenu>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            onClick={() => setTheme("dark")}
            className="mr-2 hidden md:flex dark:hidden"
          >
            <MoonIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            onClick={() => setTheme("light")}
            className="mr-2 hidden dark:md:flex"
          >
            <SunIcon className="h-5 w-5" />
          </Button>

          {!loading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={user.email || ""} />
                        <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {user.user_metadata?.full_name && <p className="font-medium">{user.user_metadata.full_name}</p>}
                        {user.email && <p className="text-sm text-muted-foreground">{user.email}</p>}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/my-trips">My Trips</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex gap-2">
                  <Button asChild variant="ghost">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="relative animate-pulse hover:animate-none bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </>
          )}

          {isMobile && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <Link
                  href="/"
                  className="flex items-center pt-4"
                  style={{
                    backgroundImage:
                      "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-png-pTuaoQjxdsG0baLxpXpv1n1f4H8QKS.png')",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "64px",
                    width: "140px",
                  }}
                  aria-label="DayTrips.ai - Home"
                  onClick={() => setOpen(false)}
                />
                <nav className="mt-6 flex flex-col gap-4">
                  {navigation.map((item) =>
                    item.isExternal ? (
                      <a
                        key={item.name}
                        href="javascript:void(0)"
                        className="text-base font-medium transition-colors hover:text-primary text-primary flex items-center cursor-not-allowed"
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        {item.name} (Coming soon)
                      </a>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "text-base font-medium transition-colors hover:text-primary",
                          pathname === item.href ? "text-primary" : "text-muted-foreground",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ),
                  )}
                  <Button
                    asChild
                    variant="outline"
                    className="justify-start px-2 w-full mt-2"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/find-trip" className="flex items-center">
                      <Car className="mr-2 h-4 w-4" />
                      Road Trip
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setTheme("dark")
                      setOpen(false)
                    }}
                    className="justify-start px-2 dark:hidden"
                  >
                    <MoonIcon className="mr-2 h-4 w-4" />
                    Dark Mode
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setTheme("light")
                      setOpen(false)
                    }}
                    className="justify-start px-2 hidden dark:flex"
                  >
                    <SunIcon className="mr-2 h-4 w-4" />
                    Light Mode
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  )
}
