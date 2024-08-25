import db from '@/lib/db'
import { redirect } from 'next/navigation'

import { Header } from './components/Header'
import { ProductInformation } from './components/ProductInformation'
import { FooterProduct } from './components/FooterProduct/FooterProduct'

export default async function ProductIdPage({
  params,
}: {
  params: { productId: string }
}) {
  const product = await db.product.findUnique({
    where: {
      id: parseInt(params.productId),
    },
  })

  if (!product) {
    return redirect('/')
  }

  const productForClient = {
    ...product,
    botlePrice: product.botlePrice.toNumber(),
    contentPrice: product.contentPrice.toNumber(),
  }

  return (
    <div>
      <Header />
      <ProductInformation product={productForClient} />
      <FooterProduct productId={product.id} />
    </div>
  )
}
