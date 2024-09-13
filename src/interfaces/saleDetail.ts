export interface SaleDetailMain{
  id?: number,
  saleId: number,
  productId: number,
  includeBottlePrice: boolean,
  quantity: number,
  revenue: string,
}

export type SaleDetailPost = Omit<SaleDetailMain, 'id'>

export interface SaleDetailSale{
  id: number,
  sale: number,
  name: string,
  litros: string,
  botlePrice: string,
  contentPrice: string,
  includeBottlePrice: boolean,
  quantity: number,
  revenue: string,
}