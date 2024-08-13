"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarItem } from "../SidebarItem";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

import {
  dataGeneralSidebar,
  dataSupportSidebar,
  dataToolsSidebar,
} from "./SidebarRoutes.data";
import { LogOut } from "lucide-react";

export function SidebarRoutes() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
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
        <Separator />
        <div className="p-2 md:p-6">
          <div className="text-center">
            <Button onClick={() => signOut()}>
              Salir <LogOut className="ms-4" width={16} />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <footer className="mt-3 p-3 text-center">
          2024. Todos los derechos reservados
        </footer>
      </div>
    </div>
  );
}
