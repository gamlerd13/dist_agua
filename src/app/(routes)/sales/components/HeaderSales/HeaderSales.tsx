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
import { FormCreateSale } from "../FormCreateSale"
import { SalePost } from "@/interfaces/sale"
import { GetClient } from "@/interfaces/client"

export function HeaderSales({
  createSale,
  client,
}: {
  createSale: (values: SalePost) => void
  client: GetClient[] | null
}) {
  const [openModalCreate, setOpenModalCreate] = useState(false)
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">Lista de ventas</h2>

      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>Crear Venta</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Crear Venta</DialogTitle>
            <DialogDescription>Crear y configurar su venta</DialogDescription>
          </DialogHeader>
          <FormCreateSale
            createSale={createSale}
            setOpenModalCreate={setOpenModalCreate}
            client={client}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
