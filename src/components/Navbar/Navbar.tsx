import { Menu } from "lucide-react"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ToggleTheme } from "@/components/ToggleTheme"

import { SidebarRoutes } from "@/components/SidebarRoutes"

export function Navbar() {
  return (
    <nav className="flex items-center px-2 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-20">
        <div className="block xl:hidden">
            <Sheet>
                <SheetTrigger className="flex items-center">
                    <Menu />
                </SheetTrigger>
                <SheetContent side="left">
                    <SidebarRoutes />
                </SheetContent>
            </Sheet>
        </div>
        <div className="relative w-[300px]">

        </div>
        <div className="flex gap-x-2 items-center">
            <ToggleTheme />
        </div>
    </nav>
  )
}
