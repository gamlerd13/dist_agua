"use client"

import { HeaderSales } from "./components/HeaderSales"
import useSale from "./components/Hooks/useSale"
import { ListSales } from "./components/ListSales"
import useClient from "./Hooks/useClient"

export default function SalesPage() {
  const { sale, createSale } = useSale()
  const { client } = useClient()
  return (
    <div>
      <HeaderSales createSale={createSale} client={client} />
      <ListSales sale={sale} />
    </div>
  )
}
