"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormProduct } from "./FormProduct"
import { Product } from "@/interfaces/product"
import { SaleDetailPost } from "@/interfaces/saleDetail"

export function NewProduct({
  product,
  createSaleDetail,
  saleId,
}: {
  product: Product[] | null
  createSaleDetail: (values: SaleDetailPost) => void
  saleId: number
}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Añadir producto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Añadir producto</DialogTitle>
          <DialogDescription>
            Añadir un producto a la venta actual
          </DialogDescription>
        </DialogHeader>
        <FormProduct
          setOpen={setOpen}
          product={product}
          createSaleDetail={createSaleDetail}
          saleId={saleId}
        />
      </DialogContent>
    </Dialog>
  )
}
