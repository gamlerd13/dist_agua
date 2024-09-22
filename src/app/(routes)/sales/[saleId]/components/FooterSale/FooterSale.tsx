"use client"

import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FooterSalesProps } from "./FooterSale.types"
import { useDeleteSale } from "./Hooks/useFooterSale"

export function FooterSale(props: FooterSalesProps) {
  const { saleId } = props
  const { deleteSale } = useDeleteSale()

  return (
    <div className="flex justify-end mt-5">
      <Button variant="destructive" onClick={() => deleteSale(saleId)}>
        <Trash className="h-4 w-4 mr-2" />
        Eliminar venta
      </Button>
    </div>
  )
}
