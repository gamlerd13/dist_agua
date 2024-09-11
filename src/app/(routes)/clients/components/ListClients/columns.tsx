// components/ListClients/columns.tsx

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
import { Client } from "@/interfaces/client"

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "nombres",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombres
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "apellidos",
    header: "Apellidos",
  },
  {
    accessorKey: "telefono",
    header: "Teléfono",
  },
  {
    accessorKey: "direccion",
    header: "Dirección",
  },
  {
    accessorKey: "modeloNegocio",
    header: "Modelo de Negocio",
  },
  {
    accessorKey: "coordenadaX",
    header: "Coordenada X",
  },
  {
    accessorKey: "coordenadaY",
    header: "Coordenada Y",
  },
  {
    accessorKey: "fechaCumple",
    header: "Fecha de Cumpleaños",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "isActive",
    header: "Activo",
    cell: ({ getValue }) => {
      const isActive = getValue() as boolean
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isActive ? "SÍ" : "NO"}
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
            <Link href={`/clients/${id}`}>
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
