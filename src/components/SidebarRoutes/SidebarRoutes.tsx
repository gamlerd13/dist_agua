"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import { SidebarItem } from "../SidebarItem"
import {
  dataGeneralSidebar,
  dataSidebarExpenses,
  dataSupportSidebar,
  dataToolsSidebar,
} from "./SidebarRoutes.data"
import { cn } from "@/lib/utils"

export function SidebarRoutes() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow">
        <div className="p-2 md:p-6">
          <p className="text-slate-500 mb-2">GENERAL</p>
          {dataGeneralSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}

          {dataSidebarExpenses.map(({ title, icon: Icon, children }) => (
            <Accordion type="single" collapsible key={title}>
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="flex gap-x-2 mt-2 light:text-slate-700 dark:text-white text-sm items-center hover:bg-slate-300/20 p-2 rounded-lg cursor-pointer w-full justify-start">
                  <Icon className="h-5 w-5" strokeWidth={1} />
                  <span className="flex-grow text-left">{title}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="ml-7">
                    {children.map(({ label, href }) => (
                      <Link
                        key={label}
                        href={href}
                        className={cn(
                          "flex gap-2 my-0.5 light:text-slate-700 dark:text-white text-sm items-center hover:bg-slate-300/20 py-2 px-6 rounded-lg cursor-pointer",
                          pathname === href && "bg-slate-400/20"
                        )}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
        <Separator />
        <div className="p-2 md:p-6">
          <p className="text-slate-500 mb-2">TOOLS</p>

          {dataToolsSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
        <Separator />
        <div className="p-2 md:p-6">
          <p className="text-slate-500 mb-2">SUPPORT</p>
          {dataSupportSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 md:p-6 border-t">
        <Button variant="outline" className="w-full" onClick={() => signOut()}>
          Salir <LogOut className="ms-4" width={16} />
        </Button>
        <footer className="mt-3 text-center text-sm text-gray-500">
          2024. Todos los derechos reservados
        </footer>
      </div>
    </div>
  )
}
