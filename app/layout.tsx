import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

// Initialize Cairo font
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
})

export const metadata: Metadata = {
  title: "أمير البيتزا  | Amir Pizza Menu",
  icons: {
    icon: "/icon.png",},
  description: "قائمة طعام أمير البيتزا",
    generator: 'v0.dev',
  applicationName: "Amir Pizza Menu",
  authors: [{ name: "Amir Pizza" }],
  keywords: ["Amir Pizza", "Pizza Menu", "Food Delivery"],
  creator: "K.Marfadi",
  publisher: "Amir Pizza",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} font-cairo`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
