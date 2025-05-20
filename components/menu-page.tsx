"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" // Import useRouter
import { MenuHeader } from "../menu-header"
import { PizzaMenu } from "@/components/pizza-menu"
import { Cart } from "@/components/cart"
import { Checkout } from "@/components/checkout"
//import { OrderConfirmation } from "@/components/order-confirmation"
import { CartProvider } from "@/components/cart-provider"

export function MenuPage() {
  const [view, setView] = useState<"menu" | "checkout" | "confirmation">("menu")
  //const [setOrderId] = useState<string | null>(null)
  const router = useRouter() // Initialize router

  const handleCheckout = () => {
    setView("checkout")
  }

  const handlePlaceOrder = (id: string) => {
    setView("confirmation")
  }

  const handleBackToMenu = () => {
    setView("menu")
  }



  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground">
        <MenuHeader onCartClick={handleCheckout} onHomeClick={handleBackToMenu} />
        <main className="container mx-auto px-4 py-8">
          {view === "menu" && (
            <>
              <PizzaMenu />
              <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
                <Cart isCompact onCheckout={handleCheckout} />
              </div>
            </>
          )}
          {view === "checkout" && <Checkout onBackToMenu={handleBackToMenu} onOrderComplete={handlePlaceOrder} />}
          {view === "confirmation" && (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-2xl font-bold mb-4">طلبك تم بنجاح!</h2>
              <button onClick={handleBackToMenu} className="bg-red-500 text-white px-4 py-2 rounded">
                العودة إلى القائمة
              </button>
            </div>
          )}
        </main>
      </div>
    </CartProvider>
  )
}
