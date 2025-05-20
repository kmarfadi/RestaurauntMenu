"use client"

import Image from "next/image"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import type { Pizza } from "@/types"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PizzaCardProps {
  pizza: Pizza
}

export function PizzaCard({ pizza }: PizzaCardProps) {
  const { addItem } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  // Ensure price is a number
  const price = Number(pizza.price)

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md ">
        <div className="aspect-square relative overflow-hidden cursor-pointer" onClick={() => setIsOpen(true)}>
          <Image
            src={pizza.image || "/placeholder.svg"}
            alt={pizza.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-cairo font-bold text-base">{pizza.name}</h3>
              <p className="font-cairo text-sm text-muted-foreground line-clamp-2 mt-1 text-xs">{price}﷼</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button onClick={() => addItem(pizza)} className="w-full bg-red-500 hover:bg-red-600 font-cairo text-xs">
            <Plus className="h-4 w-4 ml-2" />
            إضافة إلى السلة
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] font-cairo">
          <DialogHeader>
        <DialogTitle className="text-xl font-cairo font-bold">{pizza.name}</DialogTitle>
        <DialogDescription className="text-sm font-cairo">{pizza.description}</DialogDescription>
          </DialogHeader>
          <div className="relative aspect-square w-full overflow-hidden rounded-md">
        <Image src={pizza.image || "/placeholder.svg"} alt={pizza.name} fill className="object-cover" />
          </div>
          <div className="flex justify-between items-center">
        <div className="text-lg font-cairo font-bold">{price} ﷼</div>
        <Button
          onClick={() => {
            addItem(pizza)
            setIsOpen(false)
          }}
          className="bg-red-500 hover:bg-red-600 font-cairo"
        >
          <Plus className="h-4 w-4 ml-2" />
          إضافة إلى السلة
        </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
