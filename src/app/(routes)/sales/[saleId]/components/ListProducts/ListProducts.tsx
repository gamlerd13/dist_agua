"use client"

import { SaleDetailSale } from "@/interfaces/saleDetail"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ListProductsProps {
  saleDetail: SaleDetailSale[] | null
  deleteProduct: (saleDetailId: number) => Promise<void>
}

export function ListProducts({ saleDetail, deleteProduct }: ListProductsProps) {
  const updatedColumns = columns(deleteProduct)

  const totalRevenue = useMemo(() => {
    if (!saleDetail) return 0
    return saleDetail.reduce(
      (sum, detail) => sum + (parseFloat(detail.revenue) || 0),
      0
    )
  }, [saleDetail])

  const formattedTotalRevenue = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalRevenue)

  if (!saleDetail) return <DataTable columns={updatedColumns} data={[]} />

  return (
    <div>
      <DataTable columns={updatedColumns} data={saleDetail} />
      <div className="mt-4 flex justify-end items-center">
        <span className="mr-2 font-bold">Total recaudado:</span>
        <Input
          value={formattedTotalRevenue}
          readOnly
          className="w-40 text-right font-bold"
        />
      </div>
    </div>
  )
}
