"use client"

import { useState, useEffect } from "react"
import { PizzaCard } from "@/components/pizza-card"

interface Category {
  id: number
  name: string
  cover_image: string
}

interface Item {
  id: number
  name: string
  description: string
  price: number
  image: string
  category_id: number
}

export function PizzaMenu() {
  const [categories, setCategories] = useState<Category[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [category, setCategory] = useState<string>("all")
  const [filteredPizzas, setFilteredPizzas] = useState<Item[]>([])

  useEffect(() => {
    // Fetch categories and items from the /menu endpoint
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3003/menu")
        const data = await response.json()

        setCategories([ ...data.categories]) // Add default category
        setItems(data.items)
        setFilteredPizzas(data.items) // Default to show all items
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Filter items based on the selected category
    if (category === "all") {
      setFilteredPizzas(items)
    } else {
      const filtered = items.filter((item) => item.category_id === parseInt(category))
      setFilteredPizzas(filtered)
    }
  }, [category, items])

  return (
    <div className="py-8 font-cairo">
      <h2 className="text-3xl font-cairo font-bold mb-8 text-center dark:text-white">قائمة الطعام</h2>

      <div className="flex justify-center mb-8  pb-2">
        <div className="flex space-x-reverse space-x-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === "all"
                ? "bg-red-500 text-white"
                : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
            }`}
          >
            الكل
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id.toString())}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat.id.toString()
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap- max-w-5xl mx-auto">
        {filteredPizzas.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </div>
  )
}
