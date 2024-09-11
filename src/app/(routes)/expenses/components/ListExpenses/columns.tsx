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
import { ExpenseTypeExpense } from "@/interfaces/expense"

export const columns: ColumnDef<ExpenseTypeExpense>[] = [
  {
    accessorKey: "typeOfExpense",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo de gasto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => getValue() as string,
  },
  {
    accessorKey: "description",
    header: "Descripcion de gasto",
  },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({ getValue }) => {
      const price = getValue() as number
      const formattedPrice = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price)

      return <span>{formattedPrice}</span>
    },
  },
  {
    accessorKey: "amount",
    header: "Cantidad",
  },
  {
    accessorKey: "unitOfMeasure",
    header: "Unidad de medida",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ getValue }) => {
      const total = getValue() as number
      const formattedTotal = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(total)

      return <span>{formattedTotal}</span>
    },
  },
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({ row }) => {
      const date = new Date(row.original.date)
      const formattedDate = new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date)

      return formattedDate
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
            <Link href={`/expenses/${id}`}>
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
