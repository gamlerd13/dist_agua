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
import { TypeExpense } from "@/interfaces/typeExpense"

export const columns: ColumnDef<TypeExpense>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre del tipo de gasto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "hasUnitOfMeasure",
    header: "Tiene unidad de medida?",
    cell: ({ getValue }) => {
      const hasUnitOfMeasure = getValue() as boolean
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            hasUnitOfMeasure
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {hasUnitOfMeasure ? "SÍ" : "NO"}
        </span>
      )
    },
  },
  {
    accessorKey: "unitOfMeasure",
    header: "Unidad de medida",
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
            <Link href={`/typeExpense/${id}`}>
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
