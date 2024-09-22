import { ClientPost } from "@/interfaces/client"
import { Dispatch, SetStateAction } from "react"
import { LocationDistrict } from "@/interfaces/location"

export type FormCreateClientProps = {
  client?: ClientPost
  setOpenModalCreate: Dispatch<SetStateAction<boolean>>
  createClient: (values: ClientPost) => void
  locations: LocationDistrict[] | null
}