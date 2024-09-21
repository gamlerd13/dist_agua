export interface SaleMain{
  id?: number,
  clientId: number,
  saleDate: Date,
  totalRevenue: string,
  status: string,
  paymentMethod: string,
  notes: string,
}

export type SalePost = Omit<SaleMain, 'id' | 'saleDate'>
export type Sale = Required<SaleMain>

export interface SaleClient{
  id: number,
  saleDate: Date,
  totalRevenue: string,
  status: string,
  paymentMethod: string,
  notes: string,
  clientId: number,
  clientSurnames: string,
  clientNames: string,
  route: string,
  district: string,
  businessModel: string,
}