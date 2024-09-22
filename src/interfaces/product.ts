export interface ProductMain{
  id?: number,
  name: string,
  litros: string,
  isReturnable: boolean,
  botlePrice: string,
  contentPrice: number,
}
export type ProductPost = Omit<ProductMain, 'id'>
export type Product = Required<ProductMain>

export interface ProductEdit{
  id: number,
  name: string,
  litros: string,
  isReturnable: boolean,
  botlePrice: string,
  contentPrice: string,
}