"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Cart } from "@/components/cart"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { on } from "events"

interface MenuHeaderProps {
  onCartClick: () => void
  onHomeClick: () => void
}

export function MenuHeader({ onCartClick, onHomeClick }: MenuHeaderProps) {
  const { items } = useCart()
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center" onClick={onHomeClick}>
          <Link href="/" className="text-2xl font-cairo font-bold text-foreground hover:text-red-500">
            أمير البيتزا
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isDesktop ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4 ml-2" />
                  السلة
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]" side="left">
                <div className="h-full flex flex-col">
                  <Cart onCheckout={onCartClick} />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Button variant="outline" size="sm" className="relative" onClick={onCartClick}>
              <ShoppingCart className="h-4 w-4 ml-2" />
              السلة
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
