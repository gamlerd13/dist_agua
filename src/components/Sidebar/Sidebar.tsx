import { SidebarRoutes } from '@/components/SidebarRoutes'
import { Logo } from '@/components/Logo'

export function Sidebar() {
  return (
    <div className="h-screen flex flex-col border-r">
      <Logo />

      <div className="flex flex-col h-full">
        <SidebarRoutes />
      </div>
    </div>

  )
}
