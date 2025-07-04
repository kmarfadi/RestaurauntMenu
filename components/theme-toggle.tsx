"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="h-9 w-9" aria-label="تغيير المظهر">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button variant="outline" size="icon" className="h-9 w-9" onClick={toggleTheme} aria-label="تغيير المظهر">
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
