"use client"

import { DataTable } from "./data-table"
import { columns } from "./columns"
import { TypeExpense } from "@/interfaces/typeExpense"

export function ListTypeExpense({
  typeExpense,
}: {
  typeExpense: TypeExpense[] | null
}) {
  if (!typeExpense) return <DataTable columns={columns} data={[]} />

  return <DataTable columns={columns} data={typeExpense} />
}
