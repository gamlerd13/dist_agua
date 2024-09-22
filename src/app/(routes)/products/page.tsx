'use client'

import { HeaderProducts } from './components/HeaderProducts'
import useProducts from './components/Hooks/useProduct'
import { ListProducts } from './components/ListProducts'

export default function ProductsPage() {
  const { product, createProduct } = useProducts()

  return (
    <div>
      <HeaderProducts createProduct={createProduct} />
      <ListProducts product={product} />
    </div>
  )
}
