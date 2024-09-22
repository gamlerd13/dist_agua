import { ExpensePost } from "@/interfaces/expense";
import { TypeExpense } from "@/interfaces/typeExpense";
import { Dispatch, SetStateAction } from "react"

export type FormCreateExpenseProps = {
    setOpenModalCreate: Dispatch<SetStateAction<boolean>>
    createExpense:(values: ExpensePost) => void
    typeExpense: TypeExpense[] | null; 
}