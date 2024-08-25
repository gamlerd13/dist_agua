'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FormCreateProduct } from '../FormCreateProduct'
import { ProductPost } from '@/interfaces/product'
import { useState } from 'react'

export function HeaderProducts({
  createProduct,
}: {
  createProduct: (values: ProductPost) => void
}) {
  const [openModalCreate, setOpenModalCreate] = useState(false)

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">Lista de productos</h2>

      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>Crear Producto</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Crear Producto</DialogTitle>
            <DialogDescription>
              Crear y configurar su producto
            </DialogDescription>
          </DialogHeader>
          <FormCreateProduct
            createProduct={createProduct}
            setOpenModalCreate={setOpenModalCreate}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
