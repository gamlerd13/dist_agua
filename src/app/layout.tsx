import type { Metadata } from "next"
import { Noto_Sans_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

import "./globals.css"
import "leaflet/dist/leaflet.css"

const noto = Noto_Sans_Display({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Distribuidora de Agua",
  description: "Gestión de distribución web",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* <html lang="en" suppressHydrationWarning> */}
      <body className={noto.className}>
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
