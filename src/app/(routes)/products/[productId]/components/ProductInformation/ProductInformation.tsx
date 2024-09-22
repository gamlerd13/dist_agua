import { ProductForm } from '../ProductForm'
import { ProductInformationProps } from './ProductInformation.types'

export function ProductInformation(props: ProductInformationProps) {
  const { product } = props
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 mt-2">
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
        <div>
          <ProductForm product={product} />
        </div>
      </div>
    </div>
  )
}
