import db from "@/lib/db"
import { redirect } from "next/navigation"
import { Header } from "./components/Header"
import { FooterSale } from "./components/FooterSale"
import { SaleInformation } from "./components/SaleInformation"

export default async function SaleIdPage({
  params,
}: {
  params: { saleId: string }
}) {
  const sale = await db.sale.findUnique({
    where: {
      id: parseInt(params.saleId),
    },
  })

  if (!sale) {
    return redirect("/")
  }

  const saleInformation = {
    ...sale,
    totalRevenue: sale.totalRevenue.toString(),
  }

  return (
    <div>
      <Header />
      <SaleInformation sale={saleInformation} saleId={sale.id} />
      <FooterSale saleId={sale.id} />
    </div>
  )
}
