import { District } from "@/interfaces/district"
import { Client, ClientPost } from "@/interfaces/client"
import { Dispatch, SetStateAction } from "react"

export type FormCreateClientProps = {
  client?: ClientPost
  setOpenModalCreate: Dispatch<SetStateAction<boolean>>
  createClient: (values: ClientPost) => void
  districts: District[] | null
}