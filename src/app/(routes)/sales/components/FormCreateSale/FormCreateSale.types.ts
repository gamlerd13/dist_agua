
import { GetClient } from "@/interfaces/client";
import { SalePost } from "@/interfaces/sale";
import { Dispatch, SetStateAction } from "react"

export type FormCreateSaleProps = {
    setOpenModalCreate: Dispatch<SetStateAction<boolean>>
    createSale:(values: SalePost) => void
    client: GetClient[] | null; 
}