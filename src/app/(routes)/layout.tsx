import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full h-screen">
      <div className="hidden xl:block w-80 h-full xl:fixed">
        <Sidebar />
      </div>
      <div className="flex-grow xl:ml-80">
        <Navbar />
        <div className="p-6 bg-[#fafbfc] dark:bg-secondary">{children}</div>
      </div>
    </div>
  )
}
