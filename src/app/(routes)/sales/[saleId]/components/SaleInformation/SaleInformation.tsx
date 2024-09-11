import { SaleForm } from "../SaleForm"
import { SaleInformationProps } from "./SaleInformation.types"
import { ShoppingCart } from "lucide-react"

export function SaleInformation(props: SaleInformationProps) {
  const { sale } = props
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 mt-2">
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
        <SaleForm sale={sale} />
      </div>
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 h-min">
        <div className="flex items-center justify-between gap-x-2">
          <div className="flex items-center gap-x-2">
            <ShoppingCart className="w-5 h-5" />
            Productos en venta
          </div>
        </div>
        ComponenteDataTableProducts
      </div>
    </div>
  )
}
