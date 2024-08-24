'use client'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

import { SidebarItem } from '../SidebarItem'
import {
  dataGeneralSidebar,
  dataSupportSidebar,
  dataToolsSidebar,
} from './SidebarRoutes.data'

export function SidebarRoutes() {
  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow">
        <div className="p-2 md:p-6">
          <p className="text-slate-500 mb-2">GENERAL</p>
          {dataGeneralSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
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
