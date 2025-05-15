import { Link } from "@radix-ui/react-navigation-menu";
import { ThemeToggle } from "./theme-toggle";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Cart } from "./cart";
import { useMediaQuery } from "@/hooks/use-media-query";

const isDesktop = useMediaQuery("(min-width: 1024px)");
const itemCount = 0; // Replace with actual state or prop
const onCartClick = () => {
  console.log("Cart clicked"); // Replace with actual handler
};

<header className="sticky top-0 z-10 bg-background border-b border-border">
  <div className="container mx-auto px-4 py-4 flex items-center justify-between">
    <div className="flex items-center">
      <Link href="/" className="text-2xl font-cairo font-bold text-foreground hover:underline">
        أمير اليتزا
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
  <div className="pb-16"></div> {/* Add padding to ensure cards are not covered */}
</header>