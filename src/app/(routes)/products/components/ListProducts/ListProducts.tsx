'use client'

import { DataTable } from './data-table'
import { columns } from './columns'
import { Product } from '@/interfaces/product'

export function ListProducts({ product }: { product: Product[] | null }) {
  if (!product) return <DataTable columns={columns} data={[]} />

  return <DataTable columns={columns} data={product} />
}
