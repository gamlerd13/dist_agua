'use client'

import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { FooterProductsProps } from './FooterProduct.types'
import { useDeleteProduct } from './Hooks/useFooterProduct'

export function FooterProduct(props: FooterProductsProps) {
  const { productId } = props
  const { deleteProduct } = useDeleteProduct()

  return (
    <div className="flex justify-end mt-5">
      <Button variant="destructive" onClick={() => deleteProduct(productId)}>
        <Trash className="h-4 w-4 mr-2" />
        Eliminar producto
      </Button>
    </div>
  )
}
