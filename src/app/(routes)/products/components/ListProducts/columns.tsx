'use client'

import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react'

import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import Link from 'next/link'
import { Product } from '@/interfaces/product'

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre del producto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'litros',
    header: 'Litros',
    cell: ({ getValue }) => `${getValue()} L`,
  },
  {
    accessorKey: 'isReturnable',
    header: 'Es retornable?',
    cell: ({ getValue }) => {
      const isReturnable = getValue() as boolean
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            isReturnable
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {isReturnable ? 'SÍ' : 'NO'}
        </span>
      )
    },
  },
  {
    accessorKey: 'botlePrice',
    header: 'Precio de la botella',
    cell: ({ getValue }) => `S/. ${getValue()}`,
  },
  {
    accessorKey: 'contentPrice',
    header: 'Precio del contenido',
    cell: ({ getValue }) => `S/. ${getValue()}`,
  },
  {
    id: 'actions',
    header: 'Acciones',
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
            <Link href={`/products/${id}`}>
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
