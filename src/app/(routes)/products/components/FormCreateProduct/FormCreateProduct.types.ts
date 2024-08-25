import { Dispatch, SetStateAction } from "react"
import { ProductPost } from "@/interfaces/product"

export type FormCreateProductProps = {
    setOpenModalCreate: Dispatch<SetStateAction<boolean>>
    createProduct:(values: ProductPost) => void
}