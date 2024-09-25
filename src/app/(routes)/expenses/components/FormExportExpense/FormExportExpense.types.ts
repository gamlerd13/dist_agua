import { TypeExpense } from "@/interfaces/typeExpense";
import { ExpenseTypeExpense } from "@/interfaces/expense";
import { Dispatch, SetStateAction } from "react"

export interface FormExportExpenseProps {
  setOpenModalExportExpense: Dispatch<SetStateAction<boolean>>
  expenses: ExpenseTypeExpense[] | null;
  typeExpense: TypeExpense[] | null;
}
