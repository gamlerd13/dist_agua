import { Product } from "@/interfaces/product"
import { SaleDetailPost } from "@/interfaces/saleDetail"
import { Dispatch, SetStateAction } from "react"

export type FormCreateSaleDetailProps = {
    setOpen: Dispatch<SetStateAction<boolean>>
    product: Product[] | null
    createSaleDetail: (values: SaleDetailPost) => void
    saleId: number;
}