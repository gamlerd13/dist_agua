"use client"
import { ListProducts } from "../ListProducts"
import { useDeleteProduct } from "../ListProducts/Hooks/useProduct"
import { NewProduct } from "../NewProduct"
import { SaleForm } from "../SaleForm"
import useProduct from "./Hooks/useProduct"
import useSaleDetail from "./Hooks/useSaleDetail"
import { SaleInformationProps } from "./SaleInformation.types"
import { ShoppingCart } from "lucide-react"

export function SaleInformation({ sale, saleId }: SaleInformationProps) {
  const { saleDetail, getSaleDetail, createSaleDetail } = useSaleDetail(saleId)
  const { deleteProduct } = useDeleteProduct(getSaleDetail)
  const { product } = useProduct()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-6 mt-2 gap-y-4">
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
        <SaleForm sale={sale} />
      </div>
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 h-min">
        <div className="flex items-center justify-between gap-x-2 mb-4">
          <div className="flex items-center gap-x-2">
            <ShoppingCart className="w-5 h-5" />
            Productos en venta
          </div>
          <div>
            <NewProduct
              createSaleDetail={createSaleDetail}
              product={product}
              saleId={saleId}
            />
          </div>
        </div>
        <ListProducts saleDetail={saleDetail} deleteProduct={deleteProduct} />
      </div>
    </div>
  )
}
