"use client"

import { Trash } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { SaleDetailSale } from "@/interfaces/saleDetail"
import { Button } from "@/components/ui/button"

export const columns = (
  deleteProduct: (saleDetailId: number) => Promise<void>
): ColumnDef<SaleDetailSale>[] => [
  {
    header: "Nombre del producto",
    cell: ({ row }) => {
      const name = row.original.name
      const litros = row.original.litros
      return <span>{`${name} - ${litros}L`}</span>
    },
  },
  {
    accessorKey: "botlePrice",
    header: "Precio botella",
    cell: ({ getValue }) => {
      const botlePrice = getValue() as number
      const formattedBotlePrice = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(botlePrice)

      return <span>{formattedBotlePrice}</span>
    },
  },
  {
    accessorKey: "contentPrice",
    header: "Precio contenido",
    cell: ({ getValue }) => {
      const contentPrice = getValue() as number
      const formattedContentPrice = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(contentPrice)

      return <span>{formattedContentPrice}</span>
    },
  },
  {
    accessorKey: "includeBottlePrice",
    header: "Incluye precio botella?",
    cell: ({ getValue }) => {
      const includeBottlePrice = getValue() as boolean
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            includeBottlePrice
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {includeBottlePrice ? "SÍ" : "NO"}
        </span>
      )
    },
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
  },
  {
    accessorKey: "revenue",
    header: "Total",
    cell: ({ getValue }) => {
      const revenue = getValue() as number
      const formattedRevenue = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(revenue)

      return <span>{formattedRevenue}</span>
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const { id: saleDetailId } = row.original

      return (
        <div className="flex justify-end">
          <Button
            variant="destructive"
            onClick={() => deleteProduct(saleDetailId)}
          >
            <Trash className="h-4 w-4 mr-2" />
            Eliminar
          </Button>
        </div>
      )
    },
  },
]
