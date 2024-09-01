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
import { TypeExpensePost } from "@/interfaces/typeExpense"

import { useState } from "react"
import { FormCreateTypeExpense } from "../FormCreateTypeExpense"

export function HeaderTypeExpense({
  createTypeExpense,
}: {
  createTypeExpense: (values: TypeExpensePost) => void
}) {
  const [openModalCreate, setOpenModalCreate] = useState(false)

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">Lista de tipos de gasto</h2>

      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>Crear Tipo de Gasto</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Crear Tipo de Gasto</DialogTitle>
            <DialogDescription>
              Crear y configurar su tipo de gasto
            </DialogDescription>
          </DialogHeader>
          <FormCreateTypeExpense
            createTypeExpense={createTypeExpense}
            setOpenModalCreate={setOpenModalCreate}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
