"use client"

import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { SaleClient } from "@/interfaces/sale"

export const columns: ColumnDef<SaleClient>[] = [
  {
    accessorKey: "saleDate",
    header: "Fecha",
    cell: ({ row }) => {
      const date = new Date(row.original.saleDate)
      const formattedDate = new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date)

      return formattedDate
    },
  },
  {
    accessorFn: (row) => `${row.clientSurnames} ${row.clientNames}`,
    id: "clientFullName",
    header: "Apellidos y Nombres",
    cell: ({ row }) => {
      const { clientSurnames, clientNames } = row.original
      return `${clientSurnames}, ${clientNames}`
    },
  },
  {
    header: "Ruta - Distrito",
    cell: ({ row }) => {
      const route = row.original.route
      const district = row.original.district
      return <span>{`${route} - ${district}`}</span>
    },
  },
  {
    accessorKey: "totalRevenue",
    header: "Total",
    cell: ({ getValue }) => {
      const totalRevenue = getValue() as number
      const formattedRevenue = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(totalRevenue)

      return <span>{formattedRevenue}</span>
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ getValue }) => {
      const status = getValue() as string
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            status === "completed"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status === "completed" ? "Completado" : "Pendiente"}
        </span>
      )
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const { id } = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="w-8 h-4 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/sales/${id}`}>
              <DropdownMenuItem>
                <Pencil className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
