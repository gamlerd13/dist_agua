"use client"

import { SaleClient } from "@/interfaces/sale"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export function ListSales({ sale }: { sale: SaleClient[] | null }) {
  if (!sale) return <DataTable columns={columns} data={[]} />

  return <DataTable columns={columns} data={sale} />
}
