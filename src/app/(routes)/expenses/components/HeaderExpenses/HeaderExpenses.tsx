"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ExpensePost } from "@/interfaces/expense"
import { TypeExpense, TypeExpensePost } from "@/interfaces/typeExpense"

import { useState } from "react"
import { FormCreateExpense } from "../FormCreateExpense"

export function HeaderExpenses({
  createExpense,
  typeExpense,
}: {
  createExpense: (values: ExpensePost) => void
  typeExpense: TypeExpense[] | null
}) {
  const [openModalCreate, setOpenModalCreate] = useState(false)
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">Lista de gastos</h2>

      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>Crear Gasto</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Crear Gasto</DialogTitle>
            <DialogDescription>Crear y configurar su gasto</DialogDescription>
          </DialogHeader>
          <FormCreateExpense
            createExpense={createExpense}
            setOpenModalCreate={setOpenModalCreate}
            typeExpense={typeExpense}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
