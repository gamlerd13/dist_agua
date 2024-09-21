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

export interface SaleDetailGet{
  id: number,
  idSale: string,
  date: Date,
  clientId: number,
  clientSurnames: string,
  clientNames: string,
  route: string,
  district: string,
  status: string,
  product: string,
  litros: string,
  contentPrice: string,
  botlePrice: string,
  isReturnable: boolean,
  includeBottlePrice: boolean,
  quantity: string,
  revenue: string,
}