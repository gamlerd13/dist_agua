import { GetClient } from "@/interfaces/client";
import { Dispatch, SetStateAction } from "react"

export type FormExportSaleProps = {
  setOpenModalExportSale: Dispatch<SetStateAction<boolean>>
  sale: any[] | null
  client: GetClient[] | null
}