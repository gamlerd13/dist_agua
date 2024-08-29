'use client'

import { DataTable } from './data-table'
import { columns } from './columns'
import { Client } from '@/interfaces/client'

export function ListClients({ clients }: { clients: Client[] | null }) {
  console.log(clients); // Verifica los datos recibidos

  if (!clients) return <DataTable columns={columns} data={[]} />

  return <DataTable columns={columns} data={clients} />

}
