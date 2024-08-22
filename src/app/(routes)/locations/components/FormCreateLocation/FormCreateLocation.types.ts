import { District } from "@/interfaces/district"
import { LocationPost } from "@/interfaces/location"
import { Dispatch, SetStateAction } from "react"

export type FormCreateLocationProps = {
    setOpenModalCreate: Dispatch<SetStateAction<boolean>>
    createLocation:(values: LocationPost) => void
    districts: District[] | null; 
}