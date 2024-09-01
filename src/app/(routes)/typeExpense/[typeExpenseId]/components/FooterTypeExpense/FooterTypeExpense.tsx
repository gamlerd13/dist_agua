"use client"

import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FooterTypeExpenseProps } from "./FooterTypeExpense.types"
import { useDeleteTypeExpense } from "./Hooks/useFooterTypeExpense"

export function FooterTypeExpense(props: FooterTypeExpenseProps) {
  const { typeExpenseId } = props
  const { deleteTypeExpense } = useDeleteTypeExpense()

  return (
    <div className="flex justify-end mt-5">
      <Button
        variant="destructive"
        onClick={() => deleteTypeExpense(typeExpenseId)}
      >
        <Trash className="h-4 w-4 mr-2" />
        Eliminar tipo de gasto
      </Button>
    </div>
  )
}
