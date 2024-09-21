import { GetClient } from "@/interfaces/client";
import { Dispatch, SetStateAction } from "react"

export type FormExportSaleDetailProps = {
  setOpenModalExportSaleDetail: Dispatch<SetStateAction<boolean>>
  saleDetail: any[] | null
  client: GetClient[] | null
}