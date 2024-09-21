"use client"

import { HeaderSales } from "./components/HeaderSales"
import useSale from "./components/Hooks/useSale"
import useSaleDetail from "./components/Hooks/useSaleDetail"
import { ListSales } from "./components/ListSales"
import useClient from "./Hooks/useClient"

export default function SalesPage() {
  const { sale, createSale } = useSale()
  const { saleDetail } = useSaleDetail()
  const { client } = useClient()
  return (
    <div>
      <HeaderSales
        createSale={createSale}
        client={client}
        sale={sale}
        saleDetail={saleDetail}
      />
      <ListSales sale={sale} />
    </div>
  )
}
