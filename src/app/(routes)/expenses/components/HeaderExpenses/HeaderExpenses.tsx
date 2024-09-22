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
import { useState } from "react"
import { FileSpreadsheet } from "lucide-react"
import { ExpensePost } from "@/interfaces/expense"
import { TypeExpense } from "@/interfaces/typeExpense"
import { FormCreateExpense } from "../FormCreateExpense"
import { FormExportExpense } from "../FormExportExpense/FormExportExpense"

export function HeaderExpenses({
  createExpense,
  typeExpense,
  expenses,
}: {
  createExpense: (values: ExpensePost) => void
  typeExpense: TypeExpense[] | null
  expenses: any[] | null
}) {
  const [openModalCreate, setOpenModalCreate] = useState(false)
  const [openModalExportExpense, setOpenModalExportExpense] = useState(false)

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">Lista de gastos</h2>

      <div className="flex gap-5">
        <Dialog
          open={openModalExportExpense}
          onOpenChange={setOpenModalExportExpense}
        >
          <DialogTrigger asChild>
            <Button>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Exportar gastos
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Exportar Gastos</DialogTitle>
              <DialogDescription>Filtrar y exportar sus gastos</DialogDescription>
            </DialogHeader>
            <FormExportExpense
              expenses={expenses}
              setOpenModalExportExpense={setOpenModalExportExpense}
              typeExpense={typeExpense}
            />
          </DialogContent>
        </Dialog>

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
    </div>
  )
}
