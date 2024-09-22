"use client"

import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FooterExpensesProps } from "./FooterExpense.types"
import { useDeleteExpense } from "./Hooks/useFooterExpense"

export function FooterExpense(props: FooterExpensesProps) {
  const { expenseId } = props
  const { deleteExpense } = useDeleteExpense()

  return (
    <div className="flex justify-end mt-5">
      <Button variant="destructive" onClick={() => deleteExpense(expenseId)}>
        <Trash className="h-4 w-4 mr-2" />
        Eliminar gasto
      </Button>
    </div>
  )
}
