"use client"

import { ExpenseTypeExpense } from "@/interfaces/expense"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export function ListExpenses({
  expense,
}: {
  expense: ExpenseTypeExpense[] | null
}) {
  if (!expense) return <DataTable columns={columns} data={[]} />

  return <DataTable columns={columns} data={expense} />
}
