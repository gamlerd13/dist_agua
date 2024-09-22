import { TypeExpensePost } from "@/interfaces/typeExpense"

import { Dispatch, SetStateAction } from "react"

export type FormCreateTypeExpenseProps = {
    setOpenModalCreate: Dispatch<SetStateAction<boolean>>
    createTypeExpense:(values: TypeExpensePost) => void
}